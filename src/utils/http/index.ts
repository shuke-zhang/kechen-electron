
import type { UserCustomConfig } from './types';

import { getCacheToken } from '../cache';
import { HttpRequest, RequestMethodsEnum } from '@shuke~/request';
// import { RequestMethodsEnum } from '@shuke~/request/dist/shared.js';
import axios, { type AxiosRequestConfig, type Canceler } from 'axios';

const request = new HttpRequest<UserCustomConfig>(
  {
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 20 * 1000,
    withToken: true,
    joinTime: true,
    ignoreRepeatRequest: false
  },
  {
    // 请求拦截器
    request(config) {
      /**
       * token
       */
      const token = getCacheToken();
      if (config?.withToken && token) {
        config.headers![config.tokenKey || 'Authorization'] = `${config?.tokenKeyScheme || 'Bearer'} ${token}`;
      }
      /**
       * 忽略重复请求。第一个请求未完成时进行第二个请求，第一个会被被取消
       */
      if (config.ignoreRepeatRequest) {
        const key = generateKey({ ...config });
        const cancelToken = new axios.CancelToken(c => cancelInterceptor(key, c, cancelMap)); // 创建一个取消 token
        config.cancelToken = cancelToken;
      }
      /**
       * 添加时间戳到 get 请求
       */
      if (config.method?.toUpperCase() === RequestMethodsEnum.GET) {
        config.params = { _t: `${Date.now()}`, ...config.params };
      }

      return config;
    },

  }
);

export {
  request
};

const cancelMap = new Map<string, Canceler>();

/**
 * @description 生成 key 用于取消请求
 * @param config
 * @returns string
 */
export function generateKey(config: AxiosRequestConfig) {
  const { url, method, params = {}, data = {} } = config;
  return `${url}-${method}-${JSON.stringify(method === 'get' ? params : data)}`;
}


/**
 * @description 取消请求
 * @param key 生成的 key
 * @param canceler 取消函数
 * @param cancelMap 取消请求的 map
 */
export function cancelInterceptor(key: string, canceler: Canceler, cancelMap = new Map<string, Canceler>()) {
  if (cancelMap.has(key)) {
    cancelMap.get(key)?.('cancel repeat request');
  }
  cancelMap.set(key, canceler);
}
