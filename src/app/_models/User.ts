export class User{
    id: string;
    name: string;
    password: string;
    email: string;
    private permissions: Array<any>;

    constructor(data?: any){        
        if(data){            
            this.id = data._id || data.id;
            this.name = data.name;
            this.password = data.password;
            this.email = data.email;
            this.permissions = data.permissions;
        }
    }

    getPermissions(): Array<number>{
        return  this.permissions.map(p => p.action );
    }

    hasAccess(section: number){
        return this.permissions.includes(section);
    }
}

