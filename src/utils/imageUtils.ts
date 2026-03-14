/**
 * 图像处理工具类
 * 提供直连 URL 和代理 URL 的双重策略：
 * - 新加坡等可直连地区：优先使用原始 URL（快速稳定）
 * - 中国等被封锁地区：直连失败后自动回退到 Vercel 代理 URL
 */

const SUPABASE_PROJECT_ID = 'apsfgjcqkikszpxcysiv';
const SUPABASE_STORAGE_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/dishes/`;
const GOOGLE_IMG_HOST = 'https://lh3.googleusercontent.com/';
const WIKI_IMG_HOST = 'https://upload.wikimedia.org/';

const PROXY_SUPABASE = '/supabase-img/';
const PROXY_GOOGLE = '/google-img/';
const PROXY_WIKI = '/wiki-img/';

/**
 * 获取代理后的图片 URL（仅在回退时使用）
 * @param url 原始图片 URL
 * @returns 代理路径，如果该 URL 无需代理则返回原始 URL
 */
export const getProxiedImageUrl = (url: string | undefined): string => {
  if (!url) return '';
  
  if (url.includes(SUPABASE_STORAGE_URL)) {
    return url.replace(SUPABASE_STORAGE_URL, PROXY_SUPABASE);
  }
  
  if (url.startsWith(GOOGLE_IMG_HOST)) {
    return url.replace(GOOGLE_IMG_HOST, PROXY_GOOGLE);
  }

  if (url.startsWith(WIKI_IMG_HOST)) {
    return url.replace(WIKI_IMG_HOST, PROXY_WIKI);
  }
  
  return url;
};

/**
 * 兼容旧调用：直接返回原始 URL（不再强制代理）
 * NOTE: 新代码应使用 OptimizedImage 组件，而不是手动调用此函数
 */
export const getOptimizedImageUrl = (url: string | undefined): string => {
  if (!url) return '';
  return url;
};
