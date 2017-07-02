
import * as webdriver from "selenium-webdriver";
import * as firefox from "selenium-webdriver/firefox";
import { By, ThenableWebDriver } from "selenium-webdriver";
import { PageBase } from "./PageBase";

export class Workspace
{
    driver:ThenableWebDriver;
    _pageCourante : PageBase;
    
    constructor()
    {
        console.log('Workspace constructor');
        this.driver = new webdriver.Builder()
            .forBrowser('firefox')
            .usingServer('http://localhost:4444/wd/hub')
            .build();
    }

    async initDriver()
    {
        
    }

    pageCourante<T extends PageBase>(type:{new(w:Workspace):T}) : T
    {
        return <T> this._pageCourante;
    }

    changerPage<T extends PageBase>(type:{new(w:Workspace):T})
    {
        console.log('changer de page ' + this.driver)
        var p = new type(this);
        this._pageCourante = p;
        return p;
    }
}
