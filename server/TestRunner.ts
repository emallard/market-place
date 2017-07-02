

import { ObjectID } from "mongodb";

export class TestRunner
{
    session = new SessionTestRunner(); 
    async executer<T>(type:{new():T}, f:(t:T)=>any)
    {
        var controller = new type();
        controller['session'] = this.session;
        controller['utilisateurConnecte'] = (this.session.getUserId() == null) ? null : {id: new ObjectID(this.session.getUserId())};
        return await f(controller);
    }
}


export class SessionTestRunner
{
    userId:string;
    getUserId() : string {return this.userId};
    setUserId(id:string) {this.userId = id};
}