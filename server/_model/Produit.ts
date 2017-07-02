

import { ObjectID } from "mongodb";



export class Produit {
    _id: ObjectID;
    nom:string;
    prix:number;
    category:string;
}
