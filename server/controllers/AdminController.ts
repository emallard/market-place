


import { Email } from "../services/Email";
import { Persistance } from "../db/Persistance";

export class RechercheEmailsEnvoyeA
{
    aPartirDe?:Date;
    jusquA?:Date;
    destinataire:string;
}

export class AdminController
{
    async rechercherEmailsEnvoyes(recherche:RechercheEmailsEnvoyeA) : Promise<Email[]>
    {
        var criteres:any = {to: recherche.destinataire};
        if (recherche.aPartirDe != null)
            criteres.$gte = recherche.aPartirDe;
        if (recherche.jusquA != null)
            criteres.$lt = recherche.jusquA;

        return await Persistance.emails().find({criteres}).toArray();
    }
}
