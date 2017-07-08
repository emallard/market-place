

import { UserController, Inscription, Reference } from "../../api/api";

export class Aide
{
    emailVendeur:string = null;
    async unVendeur():Promise<string>
    {
        if (this.emailVendeur == null)
        {
            var userController = new UserController();
            var inscription = new Inscription();
            inscription.email = "vendeur@example.com";
            inscription.password = "pass"; 
            await userController.inscrireVendeur(inscription);
            this.emailVendeur = inscription.email;
        }
        return this.emailVendeur;
    }

    compteurReference = 0;
    unNouveauReference():Reference
    {
        var p = new Reference();
        p.titre = 'Ref' + this.compteurReference ;
        p.texte = 'texte de la ref' + this.compteurReference ;
        this.compteurReference++;
        return p;
    }
}