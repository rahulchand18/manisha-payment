/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

const ENCRYPT_SECRET_KEY = 'J@vr@!@#321HrM*a0x';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setLocalStorageData = (key: string, data: any): void => {
    try {
      const value = JSON.stringify(this.encryptData(JSON.stringify(data)));
      localStorage.setItem(key, value);
    } catch (error: any) {
      console.log(error);
    }
  };

  encryptData = (data: any): string | void => {
    try {
      if (data) {
        return CryptoJS.AES.encrypt(data, ENCRYPT_SECRET_KEY).toString();
      }
    } catch (error) {
      console.log(error);
    }
  };

  getLocalStorageData = (key: string): any => {
    try {
      const localData = localStorage.getItem(key);
      if (localData) {
        try {
          const data = JSON.parse(localData);
          return this.decryptData(data);
        } catch (error) {
          console.log(error);
          return null;
        }
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  decryptData = (data: any): any => {
    try {
      if (data) {
        const bytes = CryptoJS.AES.decrypt(data, ENCRYPT_SECRET_KEY);
        if (bytes.toString()) {
          return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  deleteLocalStorage = (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  clearAllLocalStorageData = (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };
}
