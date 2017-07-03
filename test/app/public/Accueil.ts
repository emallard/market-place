

import { Workspace } from "../Workspace";
import { By } from "selenium-webdriver";
import { PageBase } from "../PageBase";

export class SInscrireCommeVendeur extends PageBase
{
}

export class Accueil extends PageBase
{
    async atteindre()
    {
        await this.driver.get("http://localhost:4200");
    }

    async sInscrireCommeVendeur() {
      
        await this.driver.findElement(By.xpath("//*[contains(text(), 'Devenir vendeur')]")).click();
        this.workspace.changerPage(SInscrireCommeVendeur);
    }
}