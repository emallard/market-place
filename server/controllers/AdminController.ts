


import { Email } from "../_api/Email";
import { Persistance } from "../db/Persistance";
import { Utilisateur } from "../_model/Utilisateur";
import { UtilisateurConnecte } from "../UtilisateurConnecte";
import { RechercheEmailsEnvoyesA } from "../_api/RechercheEmailsEnvoyesA";



/*
export class ResultatRechercheVendeur
{
    email:string;
    dateInscription:Date;
}*/

export class AdminController
{
    utilisateurConnecte: UtilisateurConnecte;
    
    async rechercherEmailsEnvoyes(recherche:RechercheEmailsEnvoyesA) : Promise<Email[]>
    {
        if ((await this.utilisateurConnecte.utilisateur()).estUnAdmin != true)
            throw Error("Forbidden");

        var criteres:any = {to: recherche.destinataire};
        if (recherche.aPartirDe != null)
            criteres.$gte = recherche.aPartirDe;
        if (recherche.jusquA != null)
            criteres.$lt = recherche.jusquA;

        return await Persistance.emails().find({criteres}).toArray();
    }


    async rechercherVendeurs() : Promise<Utilisateur[]>
    {
        if ((await this.utilisateurConnecte.utilisateur()).estUnAdmin != true)
            throw Error("Forbidden");

        var utilisateurs = await Persistance.utilisateurs().find({estUnVendeur:true}, {password:0}).toArray();
        return utilisateurs;
    }
}
