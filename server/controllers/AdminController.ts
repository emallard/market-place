


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
import { DataCommune } from "../_model/DataCommune";



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

    async mettreAJourCommunes(csv:Csv) : Promise<string>
    {
        if ((await this.utilisateurConnecte.utilisateur()).estUnAdmin != true)
            throw Error("Forbidden");

        var lines = csv.contenu.split('\n');
        
        var champs:string[] = lines[0].split(';');
        var index_code_insee = champs.indexOf('code_insee');
        var index_nom_département = champs.indexOf('nom_département');
        var index_nom_commune = champs.indexOf('nom_commune');
        var index_codes_postaux = champs.indexOf('codes_postaux');
        var index_latitude = champs.indexOf('latitude');
        var index_longitude = champs.indexOf('longitude');

        Persistance.communes().drop();
        
        var enregistre = 0;
        var rejete = 0;

        for(var i=1; i<lines.length; ++i)
        {
            var valeurs = lines[i].split(';');
            
            if (valeurs.length != champs.length)
            {
                rejete++;
                continue;
            }

            var dataCommune = new DataCommune();
            dataCommune.nom_commune = valeurs[index_nom_commune];
            dataCommune.nom_département = valeurs[index_nom_département];

            dataCommune.code_insee = valeurs[index_code_insee];
            dataCommune.nom_département = valeurs[index_nom_département];
            dataCommune.codes_postaux = valeurs[index_codes_postaux];
            dataCommune.nom_et_code = dataCommune.nom_commune + ' (' + dataCommune.codes_postaux + ')';
            
            var longitude = parseFloat(valeurs[index_longitude]);
            var latitude = parseFloat(valeurs[index_latitude]);
            if (isNaN(longitude) || isNaN(latitude))
            {
                rejete++;
                continue;
            }

            dataCommune.coordonnees = { type: "Point", coordinates: [longitude, latitude]};

            await Persistance.communes().insertOne(dataCommune);
            enregistre++;
        }
    
        Persistance.communes().createIndex({coordonnees : "2dsphere" } );
        var message = 'Mise à jour base de données des communes : enregistrements : ' + enregistre + ' - rejets : ' + rejete;
        console.log(message);
        return message;
    }
}
