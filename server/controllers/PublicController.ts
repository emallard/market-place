import express = require("express");
import mongodb = require("mongodb");
import bodyParser = require("body-parser");
import jwt = require('jsonwebtoken');
import config = require('../config');
import { RechercheAnnonce } from "../_api/RechercheAnnonce";
import { ApiProduit } from "../_api/ApiProduit";
import { Inscription } from "../_api/Inscription";
import { InformationUtilisateur } from "../_api/InformationUtilisateur";
import { Persistance } from "../db/Persistance";
import { Utilisateur } from "../_model/Utilisateur";
import { ObjectID } from "mongodb";
import { UtilisateurConnecte } from "../UtilisateurConnecte";
import { Annonce } from "../_model/Annonce";
import { DataCommune } from "../_model/DataCommune";

export class PublicController
{
    utilisateurConnecte: UtilisateurConnecte;

    async rechercherAnnonces(recherche:RechercheAnnonce) : Promise<Annonce[]>
    {
        var requete:any = {};
        if (recherche.lieu != null && recherche.lieu != '')
            requete.lieu = recherche.lieu;
        if (recherche.reference != null && recherche.reference != '')
            requete.$text = {$search:recherche.reference};

        var annonces = 
        //await Persistance.annonces().find({$text:{$search:recherche.reference}}).toArray();
        await Persistance.annonces().find(requete).toArray();
        return annonces;
    }

    async autocompletionCommune(recherche:RechercheAnnonce) : Promise<string[]>
    {
        var communes = await Persistance.communes().find({'nom_commune': {$regex : recherche.lieu}}, {nom_commune:1, codes_postaux:1}).limit(10).toArray();
        return communes.map(c => c.nom_commune + ' (' + c.codes_postaux + ')');
    }
}
