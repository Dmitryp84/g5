import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  public isSupported: boolean = false;
  private storage: Storage;

  constructor() {
    this.isSupported = this.getIsSupported();
  }

  private getIsSupported(): boolean {
    try {
      const supported: boolean = 'localStorage' in window && window['localStorage'] !== null;
      if (supported) {
        this.storage = window['localStorage'];
        // When Safari (OS X or iOS) is in private browsing mode, it
        // appears as though localStorage is available, but trying to
        // call .setItem throws an exception.
        //
        // "QUOTA_EXCEEDED_ERR: DOM Exception 22: An attempt was made
        // to add something to storage that exceeded the quota."
        const key = `__${Math.round(Math.random() * 1e7)}`;
        this.storage.setItem(key, '');
        this.storage.removeItem(key);
      }
      return supported;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }

  private checkSupport(): boolean {
    if (!this.isSupported) {
      console.warn('Local storage not supported');
      return false;
    }
    return true;
  }

  public set(key: string, value: any): boolean {
    const support = this.checkSupport();
    if (support) {
      if (value === undefined) {
        value = null;
      } else {
        value = JSON.stringify(value);
      }

      try {
        if (this.storage) {
          this.storage.setItem(key, value);
        }
      } catch (error) {
        console.error(error.message);
        return false;
      }
      return true;
    }
    return support;
  }

  public get<T>(key: string): T | null {
    let item = null;
    const support = this.checkSupport();
    if (!support) {
      return item;
    }
    item = this.storage ? this.storage.getItem(key) : null;
    if (item === null) {
      return item;
    }
    try {
      return JSON.parse(item);
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  public remove (...keys: Array<string>): boolean {
    const support = this.checkSupport();
    if (support) {
      let result = true;
      keys.forEach((key: string) => {
        try {
          this.storage.removeItem(key);
        } catch (error) {
          console.error(error.message);
          result = false;
        }
      });
      return result;
    }
    return support;
  }

  public clear(): boolean {
    const support = this.checkSupport();
    if (support) {
      for (const key of Object.keys(this.storage)) {
        try {
          this.remove(key);
        } catch (error) {
          console.error(error.message);
          return false;
        }
      }
      return true;
    }
    return support;
  }

  public keys(): Array<string> {
    const keys: Array<string> = [];
    const support = this.checkSupport();
    if (support) {
      for (const key of Object.keys(this.storage)) {
        try {
          keys.push(key);
        } catch (error) {
          console.error(error.message);
          return keys;
        }
      }
    }
    return keys;
  }
}
