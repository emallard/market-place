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

let router = express.Router();

export class VendeurController
{
    utilisateurConnecte:UtilisateurConnecte

    async rechercherProduits() : Promise<Produit[]>
    {
        if (this.utilisateurConnecte.id == null)
            throw "Forbidden";

        var utilisateurs = 
        <Utilisateur[]> await Persistance.utilisateurs().find(
            {
                _id:this.utilisateurConnecte.id}, 
                {'vendeur.produits':1}
            ).toArray();

        return utilisateurs[0].vendeur.produits;
    }

    async ajouterProduits(produit:Produit) : Promise<void>
    {
        if (this.utilisateurConnecte.id == null)
            throw "Forbidden";

        await Persistance.utilisateurs().update({}, {$push:{"vendeur.produits":produit}});
    }

}
