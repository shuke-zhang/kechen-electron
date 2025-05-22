import { Cache } from './cache';

interface CacheType {
  /**
   * 登录凭证
   */
  TOKEN: string;
}
/**
 * 缓存
 */
const cache = new Cache<CacheType>();

/** ****************************************************** */
export function getCacheToken() {
  return cache.getToken('TOKEN');
}

export function setCacheToken(token: string) {
  return cache.setToken('TOKEN', token);
}

export function removeCacheToken() {
  return cache.remove('TOKEN');
}

export function clearCacheToken() {
  return cache.clear();
}
