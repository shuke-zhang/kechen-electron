import type { AxiosRequestConfig } from "axios";

export interface UserCustomConfig {
  /**
   * 是否携带token
   */
  withToken?: boolean;
  /**
   * 是否携带时间戳
   */
  joinTime?: boolean;
  /**
   * 是否取消重复请求
   */
  ignoreRepeatRequest?: boolean;
  /**
   *  token 键名
   */
  tokenKey?: string;
  /**
   * token 键值
   */
  tokenKeyScheme?: string;
}



export interface Canceler {
  (message?: string, config?: AxiosRequestConfig, request?: any): void;
}
