/**
 * 图像处理工具类
 * 用于优化在中国境内的加载速度
 */

const SUPABASE_PROJECT_ID = 'apsfgjcqkikszpxcysiv';
const SUPABASE_STORAGE_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/dishes/`;
const PROXY_PATH = '/supabase-img/';

/**
 * 将 Supabase 存储 URL 转换为本地 Vercel 代理 URL
 * 这样可以利用 Vercel 的边缘 CDN 缓存，提高在国内的加载速度
 */
export const getOptimizedImageUrl = (url: string | undefined): string => {
  if (!url) return '';
  
  // 如果是 Supabase 的原始存储地址，替换为我们的代理地址
  if (url.includes(SUPABASE_STORAGE_URL)) {
    return url.replace(SUPABASE_STORAGE_URL, PROXY_PATH);
  }
  
  return url;
};
