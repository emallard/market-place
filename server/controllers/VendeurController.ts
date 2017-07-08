import express = require("express");
import mongodb = require("mongodb");
import bodyParser = require("body-parser");
import config = require('../config');
import { Vendeur } from "../_model/Vendeur";
import { ApiProduit } from "../_api/ApiProduit";
import { Persistance } from "../db/Persistance";
import { Utilisateur } from "../_model/Utilisateur";
import { ObjectID } from "mongodb";
import { UtilisateurConnecte } from "../UtilisateurConnecte";
import { RechercheProduit } from "../_api/RechercheProduit";
import { Annonce } from "../_model/Annonce";
import { AjoutAnnonce } from "../_api/AjoutAnnonce";
import { Reference } from "../_model/Reference";

let router = express.Router();

export class VendeurController
{
    utilisateurConnecte:UtilisateurConnecte;

    async tousLesAnnonces() : Promise<Annonce[]>
    {
        if ((await this.utilisateurConnecte.utilisateur()).estUnVendeur != true)
            throw Error("Forbidden");

        return await Persistance.annonces().find(
            {
                idUtilisateur:this.utilisateurConnecte.id}
            ).toArray();
    }

    async ajouterAnnonce(ajout:AjoutAnnonce) : Promise<void>
    {
        if ((await this.utilisateurConnecte.utilisateur()).estUnVendeur != true)
            throw Error("Forbidden");

        var annonce = new Annonce();
        annonce.date = ajout.date;
        annonce.lieu = ajout.lieu;
        annonce.idReference = new ObjectID(ajout.idReference['_id']);
        annonce.titreReference = (await Persistance.references().findOne({_id:annonce.idReference})).titre;

        annonce.idUtilisateur = this.utilisateurConnecte.id;
        await Persistance.annonces().insertOne(annonce);
    }

    async listerReferences() : Promise<Reference[]>
    {
        if ((await this.utilisateurConnecte.utilisateur()).estUnVendeur != true)
            throw Error("Forbidden");
        return await Persistance.references().find().toArray();
    }

}
