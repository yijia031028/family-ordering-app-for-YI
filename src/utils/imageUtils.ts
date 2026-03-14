/**
 * 图像处理工具类
 * 
 * 核心策略：应用启动时探测外部图片域名（Google/Wikimedia）是否可达
 * - 可达（新加坡等地区）→ 使用原始 URL 直连，快速稳定
 * - 不可达（中国等地区）→ 全局使用 Vercel 反向代理 URL，绕过 GFW 封锁
 * 
 * NOTE: 探测用 3 秒超时。GFW 封锁时 onError 可能长时间挂起（连接超时而非立即失败），
 * 所以用 setTimeout 强制判定，避免每张图片分别等待几十秒。
 */

const SUPABASE_PROJECT_ID = 'apsfgjcqkikszpxcysiv';
const SUPABASE_STORAGE_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/dishes/`;
const GOOGLE_IMG_HOST = 'https://lh3.googleusercontent.com/';
const WIKI_IMG_HOST = 'https://upload.wikimedia.org/';

const PROXY_SUPABASE = '/supabase-img/';
const PROXY_GOOGLE = '/google-img/';
const PROXY_WIKI = '/wiki-img/';

// --- 全局网络探测状态 ---

/** 外部域名是否可达：null = 尚未探测完成 */
let externalAccessible: boolean | null = null;

/** 探测完成后的回调队列（用于在探测进行中时暂存的组件） */
const probeCallbacks: Array<(accessible: boolean) => void> = [];

/** 确保探测只执行一次 */
let probeStarted = false;

/**
 * 在应用启动时调用，探测 Google 域名是否可达
 * 使用 3 秒超时，超时即判定为不可达（在 GFW 环境下连接可能挂起几十秒）
 */
export function startNetworkProbe(): void {
  if (probeStarted) return;
  probeStarted = true;

  const img = new Image();
  let settled = false;

  const settle = (accessible: boolean) => {
    if (settled) return;
    settled = true;
    externalAccessible = accessible;
    // 通知所有等待探测结果的组件
    probeCallbacks.forEach(cb => cb(accessible));
    probeCallbacks.length = 0;
  };

  // 3 秒超时：GFW 环境下 DNS/TCP 可能挂起很久，不能等
  const timeoutId = setTimeout(() => {
    img.src = '';
    settle(false);
  }, 3000);

  img.onload = () => {
    clearTimeout(timeoutId);
    settle(true);
  };

  img.onerror = () => {
    clearTimeout(timeoutId);
    settle(false);
  };

  // 使用一个极小的 Google 图片作为探测目标
  img.src = `https://lh3.googleusercontent.com/a/default-user=s28-c?_t=${Date.now()}`;
}

/**
 * 获取当前探测结果
 * @returns true = 可直连, false = 需要代理, null = 还未探测完
 */
export function getExternalAccessible(): boolean | null {
  return externalAccessible;
}

/**
 * 注册探测结果回调（如果探测已完成则立即调用）
 */
export function onProbeComplete(callback: (accessible: boolean) => void): void {
  if (externalAccessible !== null) {
    callback(externalAccessible);
  } else {
    probeCallbacks.push(callback);
  }
}

/**
 * 获取代理后的图片 URL
 * @param url 原始图片 URL
 * @returns 代理路径。如果该 URL 无需代理则返回原始 URL
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
 * 根据探测结果智能选择图片 URL
 * - 探测结果为"可达" → 返回原始 URL
 * - 探测结果为"不可达" → 返回代理 URL
 * - 探测尚未完成 → 返回原始 URL（后续由组件自行回退）
 */
export const getSmartImageUrl = (url: string | undefined): string => {
  if (!url) return '';

  // 如果已探测到外部不可达，立即使用代理
  if (externalAccessible === false) {
    return getProxiedImageUrl(url);
  }

  // 可达或未知：先用原始 URL
  return url;
};
