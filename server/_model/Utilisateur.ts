

import { ObjectID } from "mongodb";
import { Vendeur } from "./Vendeur";

export class Utilisateur {
    _id:ObjectID;
    email:string;
    password:string;
    vendeur:Vendeur;
}