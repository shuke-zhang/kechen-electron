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
  isCancelRepeatRequest?: boolean;
}
