export class AuthorizationData {
    public id: number;
    public auth: boolean;
    public token: string;
  
    constructor(data?: any) {
      if (data) {
        this.id = data.id;
        this.auth = data.auth;
        this.token = data.token;
      }
    }
  }