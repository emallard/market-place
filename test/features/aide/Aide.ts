

import { UserController, Inscription, Produit } from "../../api/api";

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

    compteurProduit = 0;
    unNouveauProduit():Produit
    {
        var p = new Produit();
        p.nom = 'Produit' + this.compteurProduit++ ;
        p.prix = 1;
        return p;
    }
}