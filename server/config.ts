import fs = require('fs');

export class Config
{

    private static _singleton:Config;
    static singleton():Config
    {
        if (Config._singleton == null)
            Config._singleton = new Config();
        return Config._singleton;
    }

    mongo_url : string;
    smtp?: configSmtp;
    domaineFrontend: string;
    utiliserMongoStorePourLaSession: boolean;
    motDePasseAccesRestreint? : string;
    testControllerActif = false;
}

class configSmtp
{
    host : string;
    port: number;
    secure : boolean;
    user: string;
    pass: string;
}

var c = Config.singleton();

if (fs.existsSync(__dirname + '/config.override.js'))
{
    console.log('config.override.js YES');

    var override = require('./config.override.js')
    
    /*
    var fileContent = fs.readFileSync(__dirname + '/../config.override.json', 'utf8');
    var override = JSON.parse(fileContent);
    for (var key in override)
        c[key] = override[key];
    */
    override(c);
}
else
    console.log('config.override.json NO');
