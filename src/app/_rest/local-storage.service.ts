import { Injectable } from '@angular/core';
import { AuthorizationData } from '../_models/AuthorizationData';
import { User } from '../_models/User';
import { Record } from '../_models/Record';

@Injectable()
export class LocalStorageService {
  private storage: Storage;

  private authDataKey = 'testAuthData';
  private userDataKey = 'testUserData';
  private recordDataKey = 'testRecordData';

  constructor() {
    this.storage = typeof localStorage !== 'undefined' ? localStorage : null;    
  }

  get(_key) {    
    let val;
    try {
      val = JSON.parse(this.storage.getItem(_key));
    }
    catch (e) {
      console.error('Cannot read JSON from local storage at key', _key, e);
      val = null;
    }
    return val;
  }

  set(_key, _data) {
    this.storage.setItem(_key, JSON.stringify(_data));
  }

  remove(_key) {
    this.storage.removeItem(_key);
  }

  getAuthorizationData() {
    let authData: AuthorizationData = this.get(this.authDataKey);
    return authData ? authData : null;
  }

  setAuthorizationData(authData: AuthorizationData) {    
    this.set(this.authDataKey, authData);
  }

  clearAuthorizationData() {
    this.remove(this.authDataKey);
    this.clearUserData();
  }

  getUserData() {
    let userData: User = this.get(this.userDataKey);
    return userData ? new User(userData) : null;
  }

  setUserData(user: User) {
    this.set(this.userDataKey, user);
  }

  clearUserData() {
    this.remove(this.userDataKey);    
  }  

  setRecord(record){
    this.set(this.recordDataKey, record);
  }

  getRecord(): Record {
    let record = this.get(this.recordDataKey);
    return record ? new Record(record) : null;
  }
}
