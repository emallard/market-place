import { ObjectID } from "mongodb";

export class LogRecherche
{
    lieu:string;
    date:Date;
    reference:string;
    dateInsertion:Date;
    idUtilisateur:ObjectID;
}