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
import { ChangementDeMotDePasse } from "../_api/ChangementDeMotDePasse";
import * as Crypto from 'crypto';
import { TokenMotDePasse } from "../_model/TokenMotDePasse";
import { EnvoiEmail } from "../services/EnvoiEmail";
import { Email } from "../services/Email";
import { Config } from "../config";

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

    async demanderUnMotDePasseParEmail(email:string) : Promise<void>
    {
        // pas de verification si l'utilisateur existe
        var buffer = Crypto.randomBytes(48);
        var token = new TokenMotDePasse();
        token.email = email;
        token.expiration = new Date();
        token.expiration.setTime(token.expiration.getTime() + 24*3600000);
        token.token = buffer.toString('hex');
        token.utilise = false;
        await Persistance.tokensMotDePasse().insertOne(token);

        Config.singleton().domaineFrontend;
        
        var message = new Email();
        message.to = email;
        message.from = 'no-reply@example.com';
        message.subject = 'Réinitialisation de votre mot de passe';

        var lien = Config.singleton().domaineFrontend + '/reinitiliser-mot-de-passe?token=' + token.token;
        message.html = 'Pour réinitialiser, suivez ce lien: <br/> <a href="'+ lien +'">' + lien + '</a>'
        await EnvoiEmail.singleton().envoyerEmail(message)
    }

    async reinitialiserMotDePasse(changement:ChangementDeMotDePasse) : Promise<void>
    {
        var token = await Persistance.tokensMotDePasse().findOne({token: changement.token});

        if (token == null)
            throw "La reinitialisation a echouée, le lien n'est pas ou plus valide";
        if (token.utilise)
            throw "Ce lien a déjà été utilisé";

        await Persistance.utilisateurs().updateOne({email : token.email}, {$set : {password : changement.motDePasse}});
        
        await Persistance.tokensMotDePasse().updateOne({token: changement.token}, {$set : {utilise : true} });
    }
}