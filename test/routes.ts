
import express = require("express");
let router = express.Router();
module.exports = router;

router.post("/listeTest", async function (req: express.Request, res: express.Response, next: express.NextFunction)
{ 

});

router.post("/lancerTestAVide", async function (req: express.Request, res: express.Response, next: express.NextFunction)
{ 
    //res.send(JSON.stringify(descriptionChemin));
});

router.post("/lancerTest", async function (req: express.Request, res: express.Response, next: express.NextFunction)
{ 
    //res.send(JSON.stringify(retour));
});

router.post("/etatTest", async function (req: express.Request, res: express.Response, next: express.NextFunction)
{ 
    //res.send(JSON.stringify(etat));
});

