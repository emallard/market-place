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
import { Produit } from "../_model/Produit";

let router = express.Router();




export class PublicController
{
    utilisateurConnecte: UtilisateurConnecte;

    async rechercherProduits(recherche:RechercheProduit) : Promise<Produit[]>
    {
        var produits = 
        await Persistance.produits().find({$text:{$search:recherche.nom}}).toArray();
        return produits;
    }

    
}
