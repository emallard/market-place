import { ObjectID } from "mongodb";
import { Produit } from "./Produit";

export class Vendeur {
    _id:ObjectID;
    boutique:string;
    produits:Produit[];
}