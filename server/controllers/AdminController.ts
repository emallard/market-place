


import { Email } from "../_api/Email";
import { Persistance } from "../db/Persistance";
import { Utilisateur } from "../_model/Utilisateur";
import { UtilisateurConnecte } from "../UtilisateurConnecte";
import { RechercheEmailsEnvoyesA } from "../_api/RechercheEmailsEnvoyesA";
import { Reference } from "../_model/Reference";
import { Annonce } from "../_model/Annonce";
import { RechercheAnnonce } from "../_api/RechercheAnnonce";
import { LogRecherche } from "../_model/LogRecherche";
import { Csv } from "../_api/Csv";



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


    async ajouterReference(reference:Reference) : Promise<void>
    {
        if ((await this.utilisateurConnecte.utilisateur()).estUnAdmin != true)
            throw Error("Forbidden");

        await Persistance.references().insertOne(reference);
    }

    async ajouterListeReferencesEnCsv(csv:Csv) : Promise<void>
    {
        if ((await this.utilisateurConnecte.utilisateur()).estUnAdmin != true)
            throw Error("Forbidden");

        var lignes = csv.contenu.split('\n');
        for (var i=0; i<lignes.length; ++i)
        {
            var valeurs = lignes[i].split(';');
            if (valeurs.length == 2)
            {
                var reference = new Reference();
                reference.titre = valeurs[0];
                reference.texte = valeurs[1];
                await Persistance.references().insertOne(reference);
            }
        }
    }

    async listeReferences() : Promise<Reference[]>
    {
        if ((await this.utilisateurConnecte.utilisateur()).estUnAdmin != true)
            throw Error("Forbidden");

        return await Persistance.references().find().toArray();
    }

    async listeAnnonces() : Promise<Annonce[]>
    {
        if ((await this.utilisateurConnecte.utilisateur()).estUnAdmin != true)
            throw Error("Forbidden");

        return await Persistance.annonces().find().toArray();
    }

    async listeVendeurs() : Promise<Utilisateur[]>
    {
        if ((await this.utilisateurConnecte.utilisateur()).estUnAdmin != true)
            throw Error("Forbidden");

        return await Persistance.utilisateurs().find({estUnVendeur:true},{password:0}).toArray();
    }

    async listeEmails() : Promise<Email[]>
    {
        if ((await this.utilisateurConnecte.utilisateur()).estUnAdmin != true)
            throw Error("Forbidden");

        return await Persistance.emails().find().toArray();
    }

    async listeLogRecherches() : Promise<LogRecherche[]>
    {
        if ((await this.utilisateurConnecte.utilisateur()).estUnAdmin != true)
            throw Error("Forbidden");

        return await Persistance.logRecherches().find().toArray();
    }
}
