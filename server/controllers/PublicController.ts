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
import { LogRecherche } from "../_model/LogRecherche";
import { UrlDto } from "../_api/UrlDto";

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

        // insertion d'un log:
        var log = new LogRecherche();
        log.lieu = recherche.lieu;
        log.reference = recherche.reference;
        log.date = recherche.date;
        log.dateInsertion = new Date();
        log.idUtilisateur = this.utilisateurConnecte.id;
        await Persistance.logRecherches().insertOne(log);

        var annonces = await Persistance.annonces().find(requete).toArray();
        //await Persistance.annonces().find({$text:{$search:recherche.reference}}).toArray();
        
        return annonces;
    }

    async rechercherAnnoncesParUrl(url:UrlDto) : Promise<Annonce[]>
    {
        var recherche:RechercheAnnonce = JSON.parse(decodeURI(url.url));
        return await this.rechercherAnnonces(recherche);
    }

    async obtenirUrlDeRecherche(recherche:RechercheAnnonce): Promise<UrlDto>
    {
        return {url: encodeURI(JSON.stringify(recherche))};
    }

    async autocompletionCommune(recherche:RechercheAnnonce) : Promise<string[]>
    {
        var communes = await Persistance.communes().find({'nom_et_code': {$regex : recherche.lieu, $options : 'i'}}, {nom_et_code:1}).limit(20).sort({code_postaux:1}).toArray();
        var distinctes = Array.from(new Set(communes.map(c => c.nom_et_code)));
        return distinctes.slice(0, 10);

    }
}
