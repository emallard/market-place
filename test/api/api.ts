import * as Request from 'request-promise-native';

    export class ObjectID 
    {
        _id:string;
    }

let myRequest = Request.defaults({jar:true});

    async function callApi<T>(url, parameters) : Promise<any>
    {
        //console.log('envoi', parameters);
        var retour = await myRequest.post('http://localhost:3000/' + url, {body: JSON.stringify(parameters)});
        //console.log('retour', retour);

        return retour;
    }

export class RechercheProduit{ 
    nom:string;
    boutique:string;
}

export class ApiProduit{ 
    nom:string;
    prix:number;
}

export class Inscription{ 
    email:string;
    password:string;
}

export class InformationUtilisateur{ 
    estConnecte:boolean;
    email:string;
    estUnVendeur:boolean;
}

export class Produit{ 
    nom:string;
    prix:number;
}

export class Vendeur{ 
    _id:ObjectID;
    boutique:string;
    produits:Produit[];
}

export class Utilisateur{ 
    _id:ObjectID;
    email:string;
    password:string;
    vendeur:Vendeur;
}

export class PublicController{ 
    rechercherProduits(recherche:RechercheProduit)  : Promise<ApiProduit[]>{    return callApi("PublicController/rechercherProduits",recherche); }
}

export class Connexion{ 
    email:string;
    password:string;
}

export class Token{ 
    token:string;
}

export class UserController{ 
    async inscrireVendeur(inscription:Inscription)  : Promise<void>{    return await callApi("UserController/inscrireVendeur",inscription); }
    async informationUtilisateurConnecte()  : Promise<InformationUtilisateur>{    return await callApi("UserController/informationUtilisateurConnecte",{}); }
    async seConnecter(connexion:Connexion)  : Promise<void>{    return await callApi("UserController/seConnecter",connexion); }
}

export class VendeurController{ 
    rechercherProduits()  : Promise<Produit[]>{    return callApi("VendeurController/rechercherProduits",{}); }
    ajouterProduits(produit:Produit)  : Promise<void>{    return callApi("VendeurController/ajouterProduits",produit); }
}
