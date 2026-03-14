/**
 * 图像处理工具类
 * 用于优化在中国境内的加载速度
 */

const SUPABASE_PROJECT_ID = 'apsfgjcqkikszpxcysiv';
const SUPABASE_STORAGE_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/dishes/`;
const GOOGLE_IMG_HOST = 'https://lh3.googleusercontent.com/';
const WIKI_IMG_HOST = 'https://upload.wikimedia.org/';

const PROXY_SUPABASE = '/supabase-img/';
const PROXY_GOOGLE = '/google-img/';
const PROXY_WIKI = '/wiki-img/';

/**
 * 将图片 URL 转换为本地 Vercel 代理 URL
 * 这样可以利用 Vercel 的边缘 CDN 缓存，提高在国内的加载速度，并绕过域名封锁
 */
export const getOptimizedImageUrl = (url: string | undefined): string => {
  if (!url) return '';
  
  // 处理 Supabase 存储地址
  if (url.includes(SUPABASE_STORAGE_URL)) {
    return url.replace(SUPABASE_STORAGE_URL, PROXY_SUPABASE);
  }
  
  // 处理 Google 图片
  if (url.startsWith(GOOGLE_IMG_HOST)) {
    return url.replace(GOOGLE_IMG_HOST, PROXY_GOOGLE);
  }

  // 处理 Wikimedia 图片
  if (url.startsWith(WIKI_IMG_HOST)) {
    return url.replace(WIKI_IMG_HOST, PROXY_WIKI);
  }
  
  return url;
};
