export interface CacheTime {
  day?: number;
  hour?: number;
  minutes?: number;
  second?: number;
}

export interface CacheData {
  value: any;
  expires: number;
}

/**
 * 缓存
 */
export class Cache<CacheType extends object> {
  // defaultExpires-默认过期时间 864e5表示一天的毫秒数
  defaultExpires = 864e5 * 7;

  // constructor() {
  // }
  // 将 Partial<CacheTime> 或者 number 类型的数据格式化为以毫秒为单位的时间。
  formatTime(data: Partial<CacheTime> | number): number {
    if (typeof data === 'number') return data;

    const { day, hour, minutes, second } = data;
    const dataDay = (day ? day * 24 : 0) * 864e2; // 秒
    const dataHours = (hour || 0) * 60 * 60; // 秒
    const dataMinutes = (minutes || 0) * 60; // 秒
    const dataSeconds = (second || 0) * 60; // 秒
    return (dataDay + dataHours + dataMinutes + dataSeconds) * 1000;
  }

  // 根据传入的时间（Partial<CacheTime> 或 number），计算并返回当前时间加上该时间的过期时间戳。如果 time 是 -1，则将 expires 设置为 Number.MAX_SAFE_INTEGER，表示这个时间无限远（即不会过期）
  getExpires(time?: Partial<CacheTime> | number): number {
    let expires = this.defaultExpires;
    if (time === -1) expires = Number.MAX_SAFE_INTEGER;
    else if (time) expires = this.formatTime(time);

    return new Date().getTime() + expires;
  }

  stringifyJson<T = any>(data: T): string {
    try {
      return JSON.stringify(data);
    } catch (error) {
      throw new Error(error as any);
    }
  }

  parseJson(data: string): object {
    try {
      return JSON.parse(data);
    } catch (error) {
      throw new Error(error as any);
    }
  }

  setToken<K extends keyof CacheType>(key: K, value: CacheType[K], options = this.defaultExpires) {
    if (typeof localStorage === 'undefined') return;
    const _key = key;

    const data = this.stringifyJson({
      value,
      expires: new Date()
    });
    // expires: this.getExpires(options)
    console.log(options);

    try {
      if (data) {
        localStorage.setItem(_key as string, data);
      }
    } catch (_e) {
      // handle exceptions, possibly by removing older items
    }
  }

  getToken<K extends keyof CacheType>(key: K) {
    if (typeof localStorage === 'undefined') return null;
    const res = localStorage.getItem(key as string);

    if (!res) return null;
    const { value } = this.parseJson(res) as CacheData;

    // const { expires, value } = this.parseJson(res) as CacheData;
    // const now = Date.now();
    // if (expires < now) {
    //   this.remove(key);
    //   return null;
    // }
    return value as CacheType[K];
  }

  set(key: string, data: any) {
    if (typeof localStorage === 'undefined') return;
    try {
      if (data) {
        localStorage.setItem(key, data);
      }
    } catch (_e) {
      // handle exceptions, possibly by removing older items
    }
  }

  get(key: string) {
    if (typeof localStorage === 'undefined') return null;
    const res = localStorage.getItem(key);

    if (!res) return null;

    return res;
  }

  remove<K extends keyof CacheType>(key: K) {
    localStorage.removeItem(key as string);
  }

  clear() {
    if (typeof localStorage === 'undefined') return;
    const keysToDelete: string[] = [];
    for (let i = 0, len = localStorage.length; i < len; i++) {
      // localStorage.key 传入localStorage所有的下标，返回存入的名字
      const key = localStorage.key(i);
      keysToDelete.push(key as string);
    }
    keysToDelete.forEach((key) => localStorage.removeItem(key));
  }
}
