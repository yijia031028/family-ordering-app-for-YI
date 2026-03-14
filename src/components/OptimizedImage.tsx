import React, { useState, useCallback, useRef, useEffect } from 'react';
import { getSmartImageUrl, getProxiedImageUrl, onProbeComplete, getExternalAccessible } from '../utils/imageUtils';

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
 * - 如果全局探测判定外部可达：直连原始 URL
 * - 如果全局探测判定外部不可达：立即用代理 URL（无延迟）
 * - 如果探测尚未完成：先直连，onError + 超时双重回退
 */
export default function OptimizedImage({ src, alt, className, style }: OptimizedImageProps) {
  const [currentSrc, setCurrentSrc] = useState(() => getSmartImageUrl(src));
  const [hasTriedProxy, setHasTriedProxy] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // 监听全局探测结果：如果探测完成且需要代理，立即切换
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

  // 5 秒超时回退：兜底机制，防止 onError 始终不触发
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

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [src, hasTriedProxy]);

  const handleError = useCallback(() => {
    if (!hasTriedProxy && src) {
      const proxiedUrl = getProxiedImageUrl(src);
      if (proxiedUrl !== src) {
        setCurrentSrc(proxiedUrl);
        setHasTriedProxy(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }
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
 * 同样利用全局探测结果 + onError + 超时三重保障
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
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // 当 src prop 变化时重置状态
  useEffect(() => {
    setBgUrl(getSmartImageUrl(src));
    hasTriedProxyRef.current = false;
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

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [src]);

  const handleProbeError = useCallback(() => {
    if (!hasTriedProxyRef.current && src) {
      const proxiedUrl = getProxiedImageUrl(src);
      if (proxiedUrl !== src) {
        hasTriedProxyRef.current = true;
        setBgUrl(proxiedUrl);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }
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
