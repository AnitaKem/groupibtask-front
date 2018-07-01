import { User } from "./User";

export class Record{
    id: string;    
    time: Date;
    user: User;
    text: string;
    section: number;

    constructor(data?: any){        
        if(data){
            this.id = data._id;
            this.time = data.time;
            this.user = data.user;
            this.text = data.text;
            this.section = data.section;
        }
    }
}