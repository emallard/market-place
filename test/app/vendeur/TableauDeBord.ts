


import { PageBase } from "../PageBase";

export class TableauDeBord extends PageBase
{
    async atteindre()
    {
        await this.driver.get("http://localhost:4200/vendeur");
    }
}