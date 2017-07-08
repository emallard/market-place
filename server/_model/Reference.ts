
import { ObjectID } from "mongodb";

export class Reference {
    _id: ObjectID;
    titre:string;
    texte:string;
    category:string;
}
