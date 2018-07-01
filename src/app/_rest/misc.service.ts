import { Injectable } from '@angular/core';

@Injectable()
export class MiscService {

  constructor() { }

  public static apiBaseUrl = 'https://polar-sierra-37133.herokuapp.com/api/';

  public static Sections = {    
    section1: 1,
    section2: 2,
    section3: 3,
    admin: 4,
    public: 5
  };

}
