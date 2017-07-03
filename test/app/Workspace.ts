import * as Request from 'request-promise-native';
import * as webdriver from "selenium-webdriver";
import * as firefox from "selenium-webdriver/firefox";
import { By, ThenableWebDriver } from "selenium-webdriver";
import { PageBase } from "./PageBase";

export class Workspace
{
    driver:ThenableWebDriver;
    _pageCourante : PageBase;
    
    async initDriver()
    {
        console.log('init driver');
        this.driver = new webdriver.Builder()
            .forBrowser('firefox')
            .usingServer('http://localhost:4444/wd/hub')
            .build();
        await Request.post('http://localhost:3000/TestController/donneesVides');
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


    post(url:string, args:any)
    {

    }
}
