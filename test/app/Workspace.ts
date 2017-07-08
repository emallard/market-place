import * as Request from 'request-promise-native';
import * as webdriver from "selenium-webdriver";
import * as firefox from "selenium-webdriver/firefox";
import { By, ThenableWebDriver } from "selenium-webdriver";
import { PageBase } from "./PageBase";
import { ApiCall } from "../api/ApiCall";
import { Aide } from "../features/aide/Aide";

export class Workspace
{
    aide:Aide;
    driver:ThenableWebDriver;
    _pageCourante : PageBase;
    
    async initDriver()
    {
        this.aide = new Aide();
        console.log('init driver');
        this.driver = new webdriver.Builder()
            .forBrowser('firefox')
            .usingServer('http://localhost:4444/wd/hub')
            .build();
        ApiCall.resetRequest();
        await ApiCall.callApi('TestController/donneesVides', {});
    }

    pageCourante<T extends PageBase>(type:{new(w:Workspace):T}) : T
    {
        return <T> this._pageCourante;
    }

    changerPage<T extends PageBase>(type:{new(w:Workspace):T})
    {
        var p = new type(this);
        console.log('changer de page ' + typeof(p).toString())
        this._pageCourante = p;
        return p;
    }


    post(url:string, args:any)
    {

    }
}
