import * as express from 'express';
import * as ExpressSession from 'express-session';
const MongoStore = require('connect-mongo')(ExpressSession);



import path = require("path");
import logger = require("morgan");
import bodyParser = require("body-parser");
//import cookieParser = require('cookie-parser');
import cors = require('cors');
import { Persistance } from "./db/Persistance";
import { RegisterControllers } from "./registerControllers";
import { Utilisateur } from "./_model/Utilisateur";
import { Config } from "./config";


let app = express();
export = app;

(async function() {
    await Persistance.singleton().init();

    if (app.get("env") === "development") {
        app.use(logger("dev"));
    }


    var corsOptions = {
        origin: Config.singleton().domaineFrontend,
        credentials:true,
    }


    app.use(cors(corsOptions));

/*
    app.use(function(req, res, next) {
        console.log('---------------');
        console.log(req.headers);
        console.log('---------------'); 
        next();
    })
*/
    var store = undefined;
    if (Config.singleton().utiliserMongoStorePourLaSession)
        store = new MongoStore({db: Persistance.mongodb()});

    app.use(ExpressSession({
        secret: 'sddsf fmkpojcncdsyusdb',
        resave: true,
        saveUninitialized: true,
        store : store
    }));
    
/*
    app.use(function(req, res, next) {
        console.log('--- session log');
        console.log(req.session);
        console.log('---------------');
        next();
    })
*/


    app.use(bodyParser.json({limit: 2000000, type:(req)=>true}));
    //app.use(bodyParser.urlencoded({ extended: false }));

    app.use("/", require("./AccesRestreint"));

    // Routes
    var itest = 0;
    app.get('/test', function(req, res, next) {res.send('OK ' + (itest++))});
    app.use("/", require("./routes"));


    // Client
    var distDir = path.join(__dirname, "..", "..", "client", "dist")
    app.use('/', express.static(distDir));
    app.get('/*', function (req, res) {
        res.sendFile(path.join(distDir + '/index.html'));
    });

    // error handlers

    app.use(function(req, res, next) {
        let err = <any>new Error("Not Found");
        err["status"] = 404;
        next(err);
    });

    // development error handler
    // will print stacktrace
    if (app.get("env") === "development") {
        app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            //console.log(err.stack);

            console.log(err.message);
            console.log(err);
            
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            res.status(err.status || 500);
            res.write(JSON.stringify({
                message: err.message,
                error: err
            }));
            res.end();
        });
    }


    // production error handler
    // no stacktraces leaked to user
    app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        res.status(err.status || 500);
        res.write(JSON.stringify({
            message: err.message,
            error: err
        }));
        res.end();
    });


})();

