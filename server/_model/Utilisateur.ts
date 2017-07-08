

import { ObjectID } from "mongodb";
import { Vendeur } from "./Vendeur";
import { ProfilUtilisateur } from "./ProfilUtilisateur";

export class Utilisateur {
    _id:ObjectID;
    email:string;
    password:string;
    dateInscription:Date;
    estUnVendeur:boolean;
    estUnAdmin:boolean;

    profil:ProfilUtilisateur;
}