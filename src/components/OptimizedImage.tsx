import React, { useState, useCallback, useRef, useEffect } from 'react';
import { getProxiedImageUrl } from '../utils/imageUtils';

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
 * 智能图片组件：优先直连原始 URL，加载失败时自动回退到 Vercel 代理
 * - 新加坡等可直连地区：直接加载原始图片（快速稳定）
 * - 中国等被封锁地区：直连失败 → 自动切换到代理 URL
 */
export default function OptimizedImage({ src, alt, className, style }: OptimizedImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src || '');
  const [hasTriedProxy, setHasTriedProxy] = useState(false);

  const handleError = useCallback(() => {
    // 如果还没尝试过代理，且代理 URL 与原始 URL 不同，则回退到代理
    if (!hasTriedProxy && src) {
      const proxiedUrl = getProxiedImageUrl(src);
      if (proxiedUrl !== src) {
        setCurrentSrc(proxiedUrl);
        setHasTriedProxy(true);
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
      loading="lazy"
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
 * 智能背景图组件：用于替代 `div + background-image` 模式
 * 先用原始 URL 作为背景，通过隐藏的 <img> 检测加载状态，失败时自动切换到代理 URL
 */
export function OptimizedBgImage({
  src,
  className,
  overlayGradient,
  style,
  children,
  onClick,
}: OptimizedBgImageProps) {
  const [bgUrl, setBgUrl] = useState(src || '');
  const hasTriedProxyRef = useRef(false);

  // 当 src prop 变化时重置状态
  useEffect(() => {
    setBgUrl(src || '');
    hasTriedProxyRef.current = false;
  }, [src]);

  const handleProbeError = useCallback(() => {
    if (!hasTriedProxyRef.current && src) {
      const proxiedUrl = getProxiedImageUrl(src);
      if (proxiedUrl !== src) {
        hasTriedProxyRef.current = true;
        setBgUrl(proxiedUrl);
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
      {/* 隐藏的探测图片，用于检测原始 URL 是否可加载 */}
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
