import express = require("express");
import mongodb = require("mongodb");
import bodyParser = require("body-parser");
import jwt = require('jsonwebtoken');
import config = require('../config');
import { RechercheProduit } from "../_api/RechercheProduit";
import { ApiProduit } from "../_api/ApiProduit";
import { Inscription } from "../_api/Inscription";
import { InformationUtilisateur } from "../_api/InformationUtilisateur";
import { Persistance } from "../db/Persistance";
import { Utilisateur } from "../_model/Utilisateur";
import { ObjectID } from "mongodb";
import { UtilisateurConnecte } from "../UtilisateurConnecte";

let router = express.Router();




export class PublicController
{
    utilisateurConnecte: UtilisateurConnecte;

    async rechercherProduits(recherche:RechercheProduit) : Promise<ApiProduit[]>
    {
        /*
        var collectionVendeur = db.mongoDb().collection('produits');
        var resultats = await collectionVendeur.find({
            nom: recherche.nom,
            boutique: recherche.boutique});

        return resultats.toArray();
        */


        var p1 = new ApiProduit();
        p1.nom = "produit1";
        p1.prix = 4;
        return [p1];
    }

    
}
