import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthorizationData } from '../_models/AuthorizationData';
import { MiscService } from './misc.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_models/User';
import 'rxjs/add/operator/do';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthService {
  public baseUrl = `${MiscService.apiBaseUrl}`;

  public authorizationData:BehaviorSubject<AuthorizationData>; 
  public userData:BehaviorSubject<User>; 

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
  ) {

    this.authorizationData = new BehaviorSubject<AuthorizationData>(this.getAuthData());
    this.userData = new BehaviorSubject<User>(this.getUserData());

    this.authorizationData.subscribe((nextVal: AuthorizationData) => {            
      if (nextVal) {
        this.localStorageService.setAuthorizationData(nextVal);
      }
      else {
        this.localStorageService.clearAuthorizationData();
      }
    });

    this.userData.subscribe((nextVal: User) => {            
      if (nextVal) {
        this.localStorageService.setUserData(nextVal);
      }
      else {
        this.localStorageService.clearUserData();
      }
    });

   }

  loginByCredentials(email: string, password: string) {
    let body = JSON.stringify({
      email: email,
      password: password
    });
    
    return this.http.post(`${this.baseUrl}auth/login`, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(
        switchMap(response => {
          this.authorizationData.next(new AuthorizationData(response));          
          return this.loadAccountData();
        }),
        catchError((err, caught) => {
          this.authorizationData.next(null);
          return Observable.throw(err);
        })
      );  
  }

  loadAccountData(): Observable<User> {
    let authData = this.localStorageService.getAuthorizationData();
    return this.http
      .get(this.baseUrl + 'users/' + authData.id, { 
        headers: new HttpHeaders().set('x-access-token', this.getAuthorizationHeader()) })
      .pipe(
        map(response => {
          let user = new User(response);
          this.userData.next(user);
          return user;
        }));
  }

  getAuthData(): AuthorizationData {
    return this.localStorageService.getAuthorizationData();
  }

  setAuthData(authData: AuthorizationData): void {
    this.authorizationData.next(authData);
  }

  getUserData(): User {
    return this.localStorageService.getUserData();
  }

  getObservableAuthData(): Observable<AuthorizationData> {
    return this.authorizationData.asObservable();
  }

  getAuthorizationHeader(): string {
    let obj = this.localStorageService.getAuthorizationData();
    return obj ? obj.token : '';
  }

  isLoggedIn(): boolean {
    return !!this.authorizationData.getValue();
  }
}
