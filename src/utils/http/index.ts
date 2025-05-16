

import type { UserCustomConfig } from './types';

import { HttpRequest } from '@shuke~/request';

const request = new HttpRequest<UserCustomConfig>(
  {
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 20 * 1000,
    withToken: true,
    joinTime: true,
    isCancelRepeatRequest: false
  },
  {

  }
);
