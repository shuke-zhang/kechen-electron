import { createBaseConfirm } from './confirm';
import { createBaseMessage } from './message';

// Message
/**
 * 调用消息提示
 * 可使用 .then() 或 await 来处理消息来等待消息关闭后再执行
 * 也可以直接使用
 */
export const showMessageSuccess = createBaseMessage('success');
export const showMessageError = createBaseMessage('error');
export const showMessageInfo = createBaseMessage('info');
export const showMessageWarning = createBaseMessage('warning');

// Confirm
export const confirmSuccess = createBaseConfirm('success');
export const confirmError = createBaseConfirm('error');
export const confirmInfo = createBaseConfirm('info');
export const confirmWarning = createBaseConfirm('warning');
