import express = require("express");
import mongodb = require("mongodb");
import bodyParser = require("body-parser");
import jwt = require('jsonwebtoken');
import config = require('../config');
import { Persistance } from "../db/Persistance";
import { Vendeur } from "../_model/Vendeur";
import { Inscription } from "../_api/Inscription";
import { Connexion } from "../_api/Connexion";
import { Token } from "../_api/Token";
import { InformationUtilisateur } from "../_api/InformationUtilisateur";
import { Utilisateur } from "../_model/Utilisateur";
import { ObjectID } from "mongodb";
import { UtilisateurConnecte } from "../UtilisateurConnecte";
import { Session } from "../Session";

export class UserController
{

    utilisateurConnecte: UtilisateurConnecte;
    session: Session;

    async inscrireVendeur(inscription:Inscription) : Promise<void>
    {
        
        var utilisateur = new Utilisateur();
        utilisateur.email = inscription.email;
        utilisateur.password = inscription.password; 
        var insertedUser = await Persistance.utilisateurs().insertOne(utilisateur);
        this.session.setUserId(insertedUser.insertedId.toHexString());
    }

    async informationUtilisateurConnecte() : Promise<InformationUtilisateur>
    {
        var estConnecte = this.utilisateurConnecte.id != null;

        var information = new InformationUtilisateur();
        if (estConnecte)
        {
            var trouvé = <Utilisateur> await Persistance.utilisateurs().findOne({
                _id: this.utilisateurConnecte.id });
            
            information.email = trouvé.email;
            information.estUnVendeur = trouvé.vendeur != null;
            console.log(information);
        }

        console.log(information);
        return information;
    }

    async seConnecter(connexion:Connexion) : Promise<void>
    {
        var password = connexion.password;
        var email = connexion.email;

        try
        {
            var trouvé = await Persistance.utilisateurs().findOne({email:email, password:password});
            this.session.setUserId(trouvé._id.toHexString());
            console.log('connecté');
        }
        catch(exc)
        {
            console.log(exc);
            console.log('non connecté');
        }
    }
}