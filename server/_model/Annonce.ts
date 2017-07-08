
import { ObjectID } from "mongodb";



export class Annonce {
    _id: ObjectID;
    idUtilisateur: ObjectID;
    lieu:string;
    date:Date;
    idReference: ObjectID;
    titreReference:string;
}
