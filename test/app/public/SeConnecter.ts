



import { PageBase } from "../PageBase";
import { Connexion } from "../../api/api";
import { By } from "selenium-webdriver";
import { TableauDeBord } from "../vendeur/TableauDeBord";

export class SeConnecter extends PageBase
{
    async atteindre()
    {
        await this.driver.get("http://localhost:4200/se-connecter");
    }

    async seConnecter(connexion:Connexion)
    {
        console.log('email');
        var elt = await this.driver.findElement(By.css('[name="email"]'));
        await elt.clear();
        await elt.sendKeys(connexion.email);
        console.log('password');
        elt = await this.driver.findElement(By.css('[name="password"]'));
        await elt.clear();
        await elt.sendKeys(connexion.password);
        console.log('click');
        
        elt = await this.workspace.driver.findElement(By.xpath('//button[contains(text(),"Se connecter")]'));
        await elt.click();

        this.workspace.changerPage(TableauDeBord);
    }
}