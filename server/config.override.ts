
import { Config } from "./config";

export = function (c: Config)
{
    c.mongo_url = "mongodb://localhost:27017/marketplace";
    c.domaineFrontend = "http://localhost:4200";
    c.utiliserMongoStorePourLaSession = true;
    c.motDePasseAccesRestreint = null;//'azerty';
}