
         import express = require("express");
         let router = express.Router();
         module.exports = router;
         
         import {Session} from './Session';
         import {UtilisateurConnecte} from './UtilisateurConnecte';
         import {ObjectID} from "mongodb";
         
import {AdminController} from "./controllers/AdminController"

router.post("/AdminController/rechercherEmailsEnvoyes", async function (req: express.Request, res: express.Response, next: express.NextFunction)
{ var c = new AdminController();
var session = new Session();
session.req = req;
c['session'] = session
var utilisateurConnecte = new UtilisateurConnecte();
if (req.session.userId == null) utilisateurConnecte.id = null;
else utilisateurConnecte.id = new ObjectID(req.session.userId)
c['utilisateurConnecte'] = utilisateurConnecte;
var retour = await c.rechercherEmailsEnvoyes(<any> req.body);
res.send(JSON.stringify(retour));
});


router.post("/AdminController/rechercherVendeurs", async function (req: express.Request, res: express.Response, next: express.NextFunction)
{ var c = new AdminController();
var session = new Session();
session.req = req;
c['session'] = session
var utilisateurConnecte = new UtilisateurConnecte();
if (req.session.userId == null) utilisateurConnecte.id = null;
else utilisateurConnecte.id = new ObjectID(req.session.userId)
c['utilisateurConnecte'] = utilisateurConnecte;
var retour = await c.rechercherVendeurs();
res.send(JSON.stringify(retour));
});


router.post("/AdminController/ajouterReference", async function (req: express.Request, res: express.Response, next: express.NextFunction)
{ var c = new AdminController();
var session = new Session();
session.req = req;
c['session'] = session
var utilisateurConnecte = new UtilisateurConnecte();
if (req.session.userId == null) utilisateurConnecte.id = null;
else utilisateurConnecte.id = new ObjectID(req.session.userId)
c['utilisateurConnecte'] = utilisateurConnecte;
var retour = await c.ajouterReference(<any> req.body);
res.send(JSON.stringify(retour));
});


router.post("/AdminController/listeReferences", async function (req: express.Request, res: express.Response, next: express.NextFunction)
{ var c = new AdminController();
var session = new Session();
session.req = req;
c['session'] = session
var utilisateurConnecte = new UtilisateurConnecte();
if (req.session.userId == null) utilisateurConnecte.id = null;
else utilisateurConnecte.id = new ObjectID(req.session.userId)
c['utilisateurConnecte'] = utilisateurConnecte;
var retour = await c.listeReferences();
res.send(JSON.stringify(retour));
});


import {PublicController} from "./controllers/PublicController"

router.post("/PublicController/rechercherAnnonces", async function (req: express.Request, res: express.Response, next: express.NextFunction)
{ var c = new PublicController();
var session = new Session();
session.req = req;
c['session'] = session
var utilisateurConnecte = new UtilisateurConnecte();
if (req.session.userId == null) utilisateurConnecte.id = null;
else utilisateurConnecte.id = new ObjectID(req.session.userId)
c['utilisateurConnecte'] = utilisateurConnecte;
var retour = await c.rechercherAnnonces(<any> req.body);
res.send(JSON.stringify(retour));
});


import {UserController} from "./controllers/UserController"

router.post("/UserController/inscrireVendeur", async function (req: express.Request, res: express.Response, next: express.NextFunction)
{ var c = new UserController();
var session = new Session();
session.req = req;
c['session'] = session
var utilisateurConnecte = new UtilisateurConnecte();
if (req.session.userId == null) utilisateurConnecte.id = null;
else utilisateurConnecte.id = new ObjectID(req.session.userId)
c['utilisateurConnecte'] = utilisateurConnecte;
var retour = await c.inscrireVendeur(<any> req.body);
res.send(JSON.stringify(retour));
});


router.post("/UserController/informationUtilisateurConnecte", async function (req: express.Request, res: express.Response, next: express.NextFunction)
{ var c = new UserController();
var session = new Session();
session.req = req;
c['session'] = session
var utilisateurConnecte = new UtilisateurConnecte();
if (req.session.userId == null) utilisateurConnecte.id = null;
else utilisateurConnecte.id = new ObjectID(req.session.userId)
c['utilisateurConnecte'] = utilisateurConnecte;
var retour = await c.informationUtilisateurConnecte();
res.send(JSON.stringify(retour));
});


router.post("/UserController/seConnecter", async function (req: express.Request, res: express.Response, next: express.NextFunction)
{ var c = new UserController();
var session = new Session();
session.req = req;
c['session'] = session
var utilisateurConnecte = new UtilisateurConnecte();
if (req.session.userId == null) utilisateurConnecte.id = null;
else utilisateurConnecte.id = new ObjectID(req.session.userId)
c['utilisateurConnecte'] = utilisateurConnecte;
var retour = await c.seConnecter(<any> req.body);
res.send(JSON.stringify(retour));
});


router.post("/UserController/demanderUnMotDePasseParEmail", async function (req: express.Request, res: express.Response, next: express.NextFunction)
{ var c = new UserController();
var session = new Session();
session.req = req;
c['session'] = session
var utilisateurConnecte = new UtilisateurConnecte();
if (req.session.userId == null) utilisateurConnecte.id = null;
else utilisateurConnecte.id = new ObjectID(req.session.userId)
c['utilisateurConnecte'] = utilisateurConnecte;
var retour = await c.demanderUnMotDePasseParEmail(<any> req.body);
res.send(JSON.stringify(retour));
});


router.post("/UserController/reinitialiserMotDePasse", async function (req: express.Request, res: express.Response, next: express.NextFunction)
{ var c = new UserController();
var session = new Session();
session.req = req;
c['session'] = session
var utilisateurConnecte = new UtilisateurConnecte();
if (req.session.userId == null) utilisateurConnecte.id = null;
else utilisateurConnecte.id = new ObjectID(req.session.userId)
c['utilisateurConnecte'] = utilisateurConnecte;
var retour = await c.reinitialiserMotDePasse(<any> req.body);
res.send(JSON.stringify(retour));
});


import {VendeurController} from "./controllers/VendeurController"

router.post("/VendeurController/tousLesAnnonces", async function (req: express.Request, res: express.Response, next: express.NextFunction)
{ var c = new VendeurController();
var session = new Session();
session.req = req;
c['session'] = session
var utilisateurConnecte = new UtilisateurConnecte();
if (req.session.userId == null) utilisateurConnecte.id = null;
else utilisateurConnecte.id = new ObjectID(req.session.userId)
c['utilisateurConnecte'] = utilisateurConnecte;
var retour = await c.tousLesAnnonces();
res.send(JSON.stringify(retour));
});


router.post("/VendeurController/ajouterAnnonce", async function (req: express.Request, res: express.Response, next: express.NextFunction)
{ var c = new VendeurController();
var session = new Session();
session.req = req;
c['session'] = session
var utilisateurConnecte = new UtilisateurConnecte();
if (req.session.userId == null) utilisateurConnecte.id = null;
else utilisateurConnecte.id = new ObjectID(req.session.userId)
c['utilisateurConnecte'] = utilisateurConnecte;
var retour = await c.ajouterAnnonce(<any> req.body);
res.send(JSON.stringify(retour));
});


router.post("/VendeurController/listerReferences", async function (req: express.Request, res: express.Response, next: express.NextFunction)
{ var c = new VendeurController();
var session = new Session();
session.req = req;
c['session'] = session
var utilisateurConnecte = new UtilisateurConnecte();
if (req.session.userId == null) utilisateurConnecte.id = null;
else utilisateurConnecte.id = new ObjectID(req.session.userId)
c['utilisateurConnecte'] = utilisateurConnecte;
var retour = await c.listerReferences();
res.send(JSON.stringify(retour));
});


import {TestController} from "./controllers/TestController"

router.post("/TestController/donneesVides", async function (req: express.Request, res: express.Response, next: express.NextFunction)
{ var c = new TestController();
var session = new Session();
session.req = req;
c['session'] = session
var utilisateurConnecte = new UtilisateurConnecte();
if (req.session.userId == null) utilisateurConnecte.id = null;
else utilisateurConnecte.id = new ObjectID(req.session.userId)
c['utilisateurConnecte'] = utilisateurConnecte;
var retour = await c.donneesVides();
res.send(JSON.stringify(retour));
});


router.post("/TestController/impersonate", async function (req: express.Request, res: express.Response, next: express.NextFunction)
{ var c = new TestController();
var session = new Session();
session.req = req;
c['session'] = session
var utilisateurConnecte = new UtilisateurConnecte();
if (req.session.userId == null) utilisateurConnecte.id = null;
else utilisateurConnecte.id = new ObjectID(req.session.userId)
c['utilisateurConnecte'] = utilisateurConnecte;
var retour = await c.impersonate(<any> req.body);
res.send(JSON.stringify(retour));
});


router.post("/TestController/emailsEnvoyes", async function (req: express.Request, res: express.Response, next: express.NextFunction)
{ var c = new TestController();
var session = new Session();
session.req = req;
c['session'] = session
var utilisateurConnecte = new UtilisateurConnecte();
if (req.session.userId == null) utilisateurConnecte.id = null;
else utilisateurConnecte.id = new ObjectID(req.session.userId)
c['utilisateurConnecte'] = utilisateurConnecte;
var retour = await c.emailsEnvoyes();
res.send(JSON.stringify(retour));
});


router.post("/TestController/seConnecterEnAdmin", async function (req: express.Request, res: express.Response, next: express.NextFunction)
{ var c = new TestController();
var session = new Session();
session.req = req;
c['session'] = session
var utilisateurConnecte = new UtilisateurConnecte();
if (req.session.userId == null) utilisateurConnecte.id = null;
else utilisateurConnecte.id = new ObjectID(req.session.userId)
c['utilisateurConnecte'] = utilisateurConnecte;
var retour = await c.seConnecterEnAdmin();
res.send(JSON.stringify(retour));
});


router.post("/TestController/seConnecter", async function (req: express.Request, res: express.Response, next: express.NextFunction)
{ var c = new TestController();
var session = new Session();
session.req = req;
c['session'] = session
var utilisateurConnecte = new UtilisateurConnecte();
if (req.session.userId == null) utilisateurConnecte.id = null;
else utilisateurConnecte.id = new ObjectID(req.session.userId)
c['utilisateurConnecte'] = utilisateurConnecte;
var retour = await c.seConnecter(<any> req.body);
res.send(JSON.stringify(retour));
});


router.post("/TestController/seDeconnecter", async function (req: express.Request, res: express.Response, next: express.NextFunction)
{ var c = new TestController();
var session = new Session();
session.req = req;
c['session'] = session
var utilisateurConnecte = new UtilisateurConnecte();
if (req.session.userId == null) utilisateurConnecte.id = null;
else utilisateurConnecte.id = new ObjectID(req.session.userId)
c['utilisateurConnecte'] = utilisateurConnecte;
var retour = await c.seDeconnecter(<any> req.body);
res.send(JSON.stringify(retour));
});

