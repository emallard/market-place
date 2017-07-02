
         import express = require("express");
         let router = express.Router();
         module.exports = router;
         
         import {Session} from './Session';
         import {ObjectID} from "mongodb";
         
import {PublicController} from "./controllers/PublicController"

router.post("/PublicController/rechercherProduits", async function (req: express.Request, res: express.Response, next: express.NextFunction)
{ var c = new PublicController();
var session = new Session();
session.req = req;
c['session'] = session
c['utilisateurConnecte'] = (req.session.userId == null) ? {id:null} : {id: new ObjectID(req.session.userId)};
var retour = await c.rechercherProduits(<any> req.body);
res.send(JSON.stringify(retour));
});


import {UserController} from "./controllers/UserController"

router.post("/UserController/inscrireVendeur", async function (req: express.Request, res: express.Response, next: express.NextFunction)
{ var c = new UserController();
var session = new Session();
session.req = req;
c['session'] = session
c['utilisateurConnecte'] = (req.session.userId == null) ? {id:null} : {id: new ObjectID(req.session.userId)};
var retour = await c.inscrireVendeur(<any> req.body);
res.send(JSON.stringify(retour));
});


router.post("/UserController/informationUtilisateurConnecte", async function (req: express.Request, res: express.Response, next: express.NextFunction)
{ var c = new UserController();
var session = new Session();
session.req = req;
c['session'] = session
c['utilisateurConnecte'] = (req.session.userId == null) ? {id:null} : {id: new ObjectID(req.session.userId)};
var retour = await c.informationUtilisateurConnecte();
res.send(JSON.stringify(retour));
});


router.post("/UserController/seConnecter", async function (req: express.Request, res: express.Response, next: express.NextFunction)
{ var c = new UserController();
var session = new Session();
session.req = req;
c['session'] = session
c['utilisateurConnecte'] = (req.session.userId == null) ? {id:null} : {id: new ObjectID(req.session.userId)};
var retour = await c.seConnecter(<any> req.body);
res.send(JSON.stringify(retour));
});


import {VendeurController} from "./controllers/VendeurController"

router.post("/VendeurController/rechercherProduits", async function (req: express.Request, res: express.Response, next: express.NextFunction)
{ var c = new VendeurController();
var session = new Session();
session.req = req;
c['session'] = session
c['utilisateurConnecte'] = (req.session.userId == null) ? {id:null} : {id: new ObjectID(req.session.userId)};
var retour = await c.rechercherProduits();
res.send(JSON.stringify(retour));
});


router.post("/VendeurController/ajouterProduits", async function (req: express.Request, res: express.Response, next: express.NextFunction)
{ var c = new VendeurController();
var session = new Session();
session.req = req;
c['session'] = session
c['utilisateurConnecte'] = (req.session.userId == null) ? {id:null} : {id: new ObjectID(req.session.userId)};
var retour = await c.ajouterProduits(<any> req.body);
res.send(JSON.stringify(retour));
});


import {TestController} from "./controllers/TestController"

router.post("/TestController/donneesVides", async function (req: express.Request, res: express.Response, next: express.NextFunction)
{ var c = new TestController();
var session = new Session();
session.req = req;
c['session'] = session
c['utilisateurConnecte'] = (req.session.userId == null) ? {id:null} : {id: new ObjectID(req.session.userId)};
var retour = await c.donneesVides();
res.send(JSON.stringify(retour));
});

