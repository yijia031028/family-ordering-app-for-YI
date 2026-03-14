import React, { useState, useCallback, useRef, useEffect } from 'react';
import { getSmartImageUrl, getProxiedImageUrl, onProbeComplete, getExternalAccessible } from '../utils/imageUtils';

/** 最大重试次数（代理 URL 加载失败时） */
const MAX_RETRY = 3;
/** 重试延迟（毫秒），每次递增 */
const RETRY_DELAYS = [1000, 2000, 3000];

interface OptimizedImageProps {
  /** 原始图片 URL */
  src: string | undefined;
  /** 图片描述 */
  alt: string;
  /** 自定义 CSS 类名 */
  className?: string;
  /** 自定义行内样式 */
  style?: React.CSSProperties;
}

/**
 * 智能图片组件
 * - 全局探测判定外部可达 → 直连原始 URL
 * - 全局探测判定外部不可达 → 立即用代理 URL
 * - 代理 URL 也失败 → 自动重试（最多 3 次，递增延迟）
 */
export default function OptimizedImage({ src, alt, className, style }: OptimizedImageProps) {
  const [currentSrc, setCurrentSrc] = useState(() => getSmartImageUrl(src));
  const [hasTriedProxy, setHasTriedProxy] = useState(false);
  const retryCountRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // 监听全局探测结果
  useEffect(() => {
    if (!src) return;
    onProbeComplete((accessible) => {
      if (!accessible) {
        const proxied = getProxiedImageUrl(src);
        if (proxied !== src) {
          setCurrentSrc(proxied);
          setHasTriedProxy(true);
        }
      }
    });
  }, [src]);

  // 5 秒超时回退（探测未完成时的兜底）
  useEffect(() => {
    if (!src || hasTriedProxy || getExternalAccessible() === true) return;
    timeoutRef.current = setTimeout(() => {
      if (!hasTriedProxy) {
        const proxied = getProxiedImageUrl(src);
        if (proxied !== src) {
          setCurrentSrc(proxied);
          setHasTriedProxy(true);
        }
      }
    }, 5000);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [src, hasTriedProxy]);

  const handleError = useCallback(() => {
    if (!src) return;

    // 阶段 1：还没尝试过代理，先切换到代理 URL
    if (!hasTriedProxy) {
      const proxiedUrl = getProxiedImageUrl(src);
      if (proxiedUrl !== src) {
        setCurrentSrc(proxiedUrl);
        setHasTriedProxy(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        return;
      }
    }

    // 阶段 2：代理 URL 也失败了，自动重试（加 cache-busting 参数避免缓存坏结果）
    if (retryCountRef.current < MAX_RETRY) {
      const delay = RETRY_DELAYS[retryCountRef.current] || 2000;
      retryCountRef.current += 1;
      const retryCount = retryCountRef.current;

      setTimeout(() => {
        const proxied = getProxiedImageUrl(src);
        // 添加 cache-busting 参数，避免浏览器缓存住失败的响应
        const separator = proxied.includes('?') ? '&' : '?';
        setCurrentSrc(`${proxied}${separator}_retry=${retryCount}`);
      }, delay);
    }
  }, [src, hasTriedProxy]);

  if (!src) return null;

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      style={style}
      onError={handleError}
    />
  );
}

// --- 背景图变体 ---

interface OptimizedBgImageProps {
  /** 原始图片 URL */
  src: string | undefined;
  /** 自定义 CSS 类名 */
  className?: string;
  /** 额外的 CSS 渐变层（如遮罩）叠加在图片上 */
  overlayGradient?: string;
  /** 自定义行内样式（backgroundImage 会被自动设置） */
  style?: React.CSSProperties;
  /** 子元素 */
  children?: React.ReactNode;
  /** 点击回调 */
  onClick?: () => void;
}

/**
 * 智能背景图组件
 * 全局探测 + onError + 超时 + 代理重试
 */
export function OptimizedBgImage({
  src,
  className,
  overlayGradient,
  style,
  children,
  onClick,
}: OptimizedBgImageProps) {
  const [bgUrl, setBgUrl] = useState(() => getSmartImageUrl(src));
  const hasTriedProxyRef = useRef(false);
  const retryCountRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // 当 src prop 变化时重置状态
  useEffect(() => {
    setBgUrl(getSmartImageUrl(src));
    hasTriedProxyRef.current = false;
    retryCountRef.current = 0;
  }, [src]);

  // 监听全局探测结果
  useEffect(() => {
    if (!src) return;
    onProbeComplete((accessible) => {
      if (!accessible && !hasTriedProxyRef.current) {
        const proxied = getProxiedImageUrl(src);
        if (proxied !== src) {
          hasTriedProxyRef.current = true;
          setBgUrl(proxied);
        }
      }
    });
  }, [src]);

  // 5 秒超时回退
  useEffect(() => {
    if (!src || hasTriedProxyRef.current || getExternalAccessible() === true) return;
    timeoutRef.current = setTimeout(() => {
      if (!hasTriedProxyRef.current && src) {
        const proxied = getProxiedImageUrl(src);
        if (proxied !== src) {
          hasTriedProxyRef.current = true;
          setBgUrl(proxied);
        }
      }
    }, 5000);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [src]);

  const handleProbeError = useCallback(() => {
    if (!src) return;

    // 阶段 1：还没尝试过代理
    if (!hasTriedProxyRef.current) {
      const proxiedUrl = getProxiedImageUrl(src);
      if (proxiedUrl !== src) {
        hasTriedProxyRef.current = true;
        setBgUrl(proxiedUrl);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        return;
      }
    }

    // 阶段 2：代理也失败，自动重试
    if (retryCountRef.current < MAX_RETRY) {
      const delay = RETRY_DELAYS[retryCountRef.current] || 2000;
      retryCountRef.current += 1;
      const retryCount = retryCountRef.current;

      setTimeout(() => {
        const proxied = getProxiedImageUrl(src);
        const separator = proxied.includes('?') ? '&' : '?';
        setBgUrl(`${proxied}${separator}_retry=${retryCount}`);
      }, delay);
    }
  }, [src]);

  const backgroundImage = overlayGradient
    ? `${overlayGradient}, url("${bgUrl}")`
    : `url("${bgUrl}")`;

  return (
    <div
      className={className}
      style={{ ...style, backgroundImage }}
      onClick={onClick}
    >
      {/* 隐藏的探测图片，用于检测 URL 是否可加载 */}
      <img
        src={bgUrl}
        alt=""
        style={{ display: 'none' }}
        onError={handleProbeError}
      />
      {children}
    </div>
  );
}
