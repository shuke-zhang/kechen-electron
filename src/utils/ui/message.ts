import type { MessageOptions, MessageOptionsWithType } from 'element-plus';

import { ElMessage } from 'element-plus';

type MessageOptionsType = Required<MessageOptions>['type'];
type MessageOptionsWithoutTypeAndMessage = Omit<MessageOptions, 'type' | 'message'>;


export function createBaseMessage(type: MessageOptionsType) {
  const defaultOptions: MessageOptionsWithoutTypeAndMessage = {
    duration: 2000,
    showClose: true
  };

  return (message: string, options: MessageOptionsWithType = {}) => {
    return new Promise<void>((resolve, reject) => {
      try {
        ElMessage({
          message,
          type,
          ...defaultOptions,
          ...options,
          onClose: () => {
            options?.onClose?.(); // 保留用户原本的 onClose 回调
            resolve(); // ✅ 消息关闭时触发 then()
          },
        });
      } catch (err) {
        reject(err); // ✅ 组件调用出错时触发 catch()
      }
    });
  };
}
