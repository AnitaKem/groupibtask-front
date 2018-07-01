import { Injectable } from '@angular/core';
import { Record } from "../_models/Record";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { MiscService } from './misc.service';
import { map } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class RecordService {

  private urlBaseRecord = MiscService.apiBaseUrl + 'records/';

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private localStorageService: LocalStorageService,
  ) { }

  getRecords(userId?: number, sectionId?: number): Observable<Array<Record>> { 
    let currentUser = this.authService.userData.getValue();
    if(currentUser){
      let params:any = {};
      if(userId) params.userId = userId;
      if(sectionId) params.sectionId = sectionId;
      
      return this.http
        .get(this.urlBaseRecord, 
          {
            params: params,
            headers: new HttpHeaders().set('x-access-token', this.authService.getAuthorizationHeader()) 
          })
        .pipe(
          map((records: Array<Record>) => records.map(record => new Record(record)))
        );
    } else {
      let lastRecord = this.localStorageService.getRecord();      
      return lastRecord ? Observable.of([lastRecord]) : Observable.of(null);
    }    
  }

  addRecord(record: Record): Observable<Record> {    
    let user = this.authService.userData.getValue();
    if(user){
      record.user = user;
      return this.http
      .post<Record>(this.urlBaseRecord, record, { headers: new HttpHeaders().set('x-access-token', this.authService.getAuthorizationHeader()) })
      .pipe(
        map(record => new Record(record))
      );
    } else {
      record.time = new Date();
      this.localStorageService.setRecord(record);
      return  Observable.of(null);
    }    
  }

}
