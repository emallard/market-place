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
}
