import express = require("express");
import mongodb = require("mongodb");
import bodyParser = require("body-parser");
import config = require('../config');
import { Vendeur } from "../_model/Vendeur";
import { ApiProduit } from "../_api/ApiProduit";
import { Persistance } from "../db/Persistance";
import { Produit } from "../_model/Produit";
import { Utilisateur } from "../_model/Utilisateur";
import { ObjectID } from "mongodb";
import { UtilisateurConnecte } from "../UtilisateurConnecte";
import { RechercheProduit } from "../_api/RechercheProduit";

let router = express.Router();

export class VendeurController
{
    utilisateurConnecte:UtilisateurConnecte;

    async tousLesProduits() : Promise<Produit[]>
    {
        if (this.utilisateurConnecte.id == null)
            throw "Forbidden";

        var produits = 
        <Produit[]> await Persistance.produits().find(
            {
                idUtilisateur:this.utilisateurConnecte.id}
            ).toArray();

        return produits;
    }

    async ajouterProduits(produit:Produit) : Promise<void>
    {
        if (this.utilisateurConnecte.id == null)
            throw "Forbidden";

        produit.idUtilisateur = this.utilisateurConnecte.id;
        await Persistance.produits().insertOne(produit);
    }

}
