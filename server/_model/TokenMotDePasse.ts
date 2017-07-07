

import { ObjectID } from "mongodb";

export class TokenMotDePasse
{
    token: string;
    expiration: Date;
    email:string;
    utilise:boolean;
}