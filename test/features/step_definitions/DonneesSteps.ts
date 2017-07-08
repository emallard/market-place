import { binding, given, then, before } from "cucumber-tsflow";
import * as Request from 'request-promise-native';
import { Workspace } from "../../app/Workspace";
import { SeConnecter } from "../../app/public/SeConnecter";
import { UserController, Inscription, TestController, VendeurController, Reference, AdminController } from "../../api/api";
import { TableauDeBord } from "../../app/vendeur/TableauDeBord";



@binding([Workspace])
export class DonneesSteps {

    constructor(protected workspace: Workspace)
    {
        
    }

    @given(/^un site vide$/)
    async givenUnSiteVide() {
        await Request.post('http://localhost:3000/TestController/donneesVides');
    }
    
    @given(/^un nouveau vendeur sur son tableau de bord$/)
    async givenUnNouveauVendeurSurSonTableauDeBord() {

        var userController = new UserController();
        var inscription = new Inscription();
        inscription.email = "bob.sinclar@example.com";
        inscription.password = "password"; 
        inscription.nom = "sinclar";
        inscription.prenom = "bob";
        inscription.genre = "homme";
        await userController.inscrireVendeur(inscription);

        var scpage = this.workspace.changerPage(SeConnecter);
        await scpage.atteindre();
        await scpage.seConnecter(inscription);

        this.workspace.changerPage(TableauDeBord);
    }

/*
    @given(/^le produit ayant pour nom "([^"]*)"/)
    async givenLeProduitAyantPourNom(nom:string) {
        var emailVendeur = await this.workspace.aide.unVendeur();
        var testController = new TestController();
        await testController.impersonate({email: emailVendeur});
        var vendeurControlleur = new VendeurController();
        var p = this.workspace.aide.unNouveauProduit();
        p.nom = nom;
        await vendeurControlleur.ajouterAnnonce(p);
    }
*/
    @given(/^la reference "([^"]*)"$/)
    async givenLaReference(titre:string) {
        var r = new Reference();
        r.titre = titre ;
        r.texte = 'texte' ;
        await new TestController().seConnecterEnAdmin();
        await new AdminController().ajouterReference(r);
    }

}
