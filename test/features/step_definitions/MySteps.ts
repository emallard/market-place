import { binding, given, then, before } from "cucumber-tsflow";

import * as webdriver from "selenium-webdriver";
import * as firefox from "selenium-webdriver/firefox";
import { By, ThenableWebDriver } from "selenium-webdriver";
import { Workspace } from "../../app/Workspace";
import { Accueil } from "../../app/public/Accueil";


@binding([Workspace])
export class MySteps {

    constructor(protected workspace: Workspace)
    {
        
    }

    @before()
    async beforeAllScenarios() {
        await this.workspace.initDriver();
    }

    @given(/^je suis sur la page d'accueil/)
    async givenPageDAccueil() {
        await this.workspace.changerPage(Accueil).atteindre();
    }
    
    @then(/^je vais sur la page d'inscription vendeur'/)
    async thenPageInscriptionVendeur() {
        await this.workspace.pageCourante(Accueil).sInscrireCommeVendeur();
    }

    //@then('/je remplis "(*)" avec "etienne.mallard@gmail.com"/')
    @then(/^je remplis "([^"]*)" avec "([^"]*)"$/)
    async jeRemplis(name:string, valeur:string)
    {
        await this.workspace.driver.findElement(By.css('[name="' + name + '"]')).sendKeys(valeur);
    }

    @then(/^je clique sur "([^"]*)"$/)
    async jeCliqueSur(texte:string)
    {
        // text()[contains(.,'Some text')
        var xPath = By.xpath('//a[contains(text(),"'+ texte +'")]');
        await this.workspace.driver.findElement(xPath).click();
    }

    @then(/^je clique sur le bouton "([^"]*)"$/)
    async jeCliqueSurLeBouton(texte:string)
    {
        // text()[contains(.,'Some text')
        var xPath = By.xpath('//button[contains(text(),"'+ texte +'")]');
        await this.workspace.driver.findElement(xPath).click();
    }

    @then(/^je dois arriver sur le tableau de bord vendeur$/)
    async jeDoisArriverSurLeTableauDeBordVendeur()
    {

    }
    
    @then(/^je vois mon produit$/)
    async jeVoisMonProduit()
    {

    }
}
