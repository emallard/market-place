
import { PublicController } from "./PublicController";
import { UserController } from "./UserController";
import { Inscription } from "../_api/Inscription";
import { TestRunner } from "../TestRunner";
import { Persistance } from "../db/Persistance";
import { Connexion } from "../_api/Connexion";
import { VendeurController } from "./VendeurController";
import { Vendeur } from "../_model/Vendeur";
import { Session } from "../Session";
import { Impersonation } from "../_api/Impersonation";
import { Email } from "../_api/Email";
import { AdminController } from "./AdminController";
import { Utilisateur } from "../_model/Utilisateur";
import { Reference } from "../_model/Reference";


export class TestController
{
    session: Session;
    
    async donneesVides() : Promise<void>
    {
        await Persistance.drop();

        var utilisateur = new Utilisateur();
        utilisateur.email = 'admin@example.com'
        utilisateur.password = 'admin'; 
        utilisateur.estUnAdmin = true;
        utilisateur.dateInscription = new Date();
        var insertedUser = await Persistance.utilisateurs().insertOne(utilisateur);
        this.session.setUserId(insertedUser.insertedId.toHexString());
    }

    async impersonate(impersonation:Impersonation) : Promise<void>
    {
        var utilisateurs = await Persistance.utilisateurs().find({email: impersonation.email}, { _id: 1}).toArray();
        if (utilisateurs.length == 0)
            throw "Pas d'utilisateur trouvé pour cet email";
        this.session.setUserId(utilisateurs[0]._id.toHexString());
    }

    async emailsEnvoyes() : Promise<Email[]>
    {
        return await Persistance.emails().find().toArray();
    }

    async seConnecterEnAdmin() : Promise<void>
    {
        await this.seConnecter('admin@example.com');
    }

    async seConnecter(email:string) : Promise<void>
    {
        var utilisateurs = await Persistance.utilisateurs().find({email: email}, { _id: 1}).toArray();
        if (utilisateurs.length == 0)
            throw "Pas d'utilisateur trouvé pour cet email";
        this.session.setUserId(utilisateurs[0]._id.toHexString());
    }

    async seDeconnecter(email:string) : Promise<void>
    {
        this.session.setUserId(null);
    }

    /*
    async insererVendeurEtSeConnecter() : Promise<string>
    {
        var runner = new TestRunner();
        await runner.executer(
            UserController, (c) => c.inscrireVendeur({email:'test@test.example.com', password:'test'}));
        await runner.executer(
            UserController, (c) => c.seConnecter({email:'test@test.example.com', password:'test'}));
        return '';
    }

    async insererProduits() : Promise<string>
    {
        Persistance.drop();
        await this.ajouterVendeurEtSeConnecter();
        var runner = new TestRunner();
        var produit = new Produit();
        produit.nom = 'jus de pomme';
        produit.prix = 0.95;
        await runner.executer(
            VendeurController, (c) => c.ajouterProduits(produit));
        return '';
    }

    async insererProduitEtRechercher() : Promise<string>
    {
        var runner = new TestRunner();
        await runner.executer(
            UserController, (c) => c.inscrireVendeur({email:'test@test.example.com', password:'test'}));
        await runner.executer(
            UserController, (c) => c.seConnecter({email:'test@test.example.com', password:'test'}));
        return '';
    }

    private async ajouterVendeurEtSeConnecter():Promise<void>
    {
        var inscription = await this.ajouterVendeur();
        await this.seConnecter({email:inscription.email, password:inscription.password});
    }

    private async ajouterVendeur():Promise<Inscription>
    {
        var inscription:Inscription = {email:'test@test.example.com', password:'test'};
        var runner = new TestRunner();
        await runner.executer(UserController, (c) => c.inscrireVendeur(inscription));
        return inscription;
    }

    private async seConnecter(connexion:Connexion):Promise<void>
    {
        var runner = new TestRunner();
        await runner.executer(UserController, (c) => c.seConnecter(connexion));;
    }
    */
}