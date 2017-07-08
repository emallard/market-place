

import { ProfilUtilisateur } from "../_model/ProfilUtilisateur";

export class InformationUtilisateur
{
    estConnecte:boolean;
    email:string;
    estUnVendeur:boolean;
    estUnAdmin:boolean;
    profil:ProfilUtilisateur;
}