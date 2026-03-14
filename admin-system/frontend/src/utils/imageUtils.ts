/**
 * 图像处理工具类
 * 用于优化在中国境内的加载速度
 */

const SUPABASE_PROJECT_ID = 'apsfgjcqkikszpxcysiv';
const SUPABASE_STORAGE_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/dishes/`;
// 注意：在管理后台，由于部署在 /admin 路径下，代理路径依然是相对于根域名的
const PROXY_PATH = '/supabase-img/';

/**
 * 将 Supabase 存储 URL 转换为本地 Vercel 代理 URL
 */
export const getOptimizedImageUrl = (url: string | undefined): string => {
  if (!url) return '';
  
  if (url.includes(SUPABASE_STORAGE_URL)) {
    return url.replace(SUPABASE_STORAGE_URL, PROXY_PATH);
  }
  
  return url;
};
