
    export class ObjectID 
    {
        _id:string;
    }

    import { Injectable } from '@angular/core';
    async function callApi<T>(url, parameters) : Promise<any>
    {
        
        var reponse = await fetch('http://localhost:3000/' + url, 
        { 
            method: "POST",
            body: JSON.stringify(parameters),            
            mode: 'cors',
            credentials : 'include'
        });

        var resultText = await reponse.text();
        if (resultText.length > 0)
            return JSON.parse(resultText);

        return undefined;

    }
@Injectable()
export class RechercheProduit{ 
    nom:string;
    boutique:string;
}

@Injectable()
export class ApiProduit{ 
    nom:string;
    prix:number;
}

@Injectable()
export class Inscription{ 
    email:string;
    password:string;
}

@Injectable()
export class InformationUtilisateur{ 
    estConnecte:boolean;
    email:string;
    estUnVendeur:boolean;
}

@Injectable()
export class Produit{ 
    _id:ObjectID;
    idUtilisateur:ObjectID;
    nom:string;
    prix:number;
    category:string;
}

@Injectable()
export class Vendeur{ 
    _id:ObjectID;
    boutique:string;
    produits:Produit[];
}

@Injectable()
export class Utilisateur{ 
    _id:ObjectID;
    email:string;
    password:string;
    vendeur:Vendeur;
}

@Injectable()
export class PublicController{ 
    rechercherProduits(recherche:RechercheProduit)  : Promise<Produit[]>{    return callApi("PublicController/rechercherProduits",recherche); }
}

@Injectable()
export class Connexion{ 
    email:string;
    password:string;
}

@Injectable()
export class Token{ 
    token:string;
}

@Injectable()
export class UserController{ 
    inscrireVendeur(inscription:Inscription)  : Promise<void>{    return callApi("UserController/inscrireVendeur",inscription); }
    informationUtilisateurConnecte()  : Promise<InformationUtilisateur>{    return callApi("UserController/informationUtilisateurConnecte",{}); }
    seConnecter(connexion:Connexion)  : Promise<void>{    return callApi("UserController/seConnecter",connexion); }
}

@Injectable()
export class VendeurController{ 
    tousLesProduits()  : Promise<Produit[]>{    return callApi("VendeurController/tousLesProduits",{}); }
    ajouterProduits(produit:Produit)  : Promise<void>{    return callApi("VendeurController/ajouterProduits",produit); }
}

@Injectable()
export class Impersonation{ 
    email:string;
}

@Injectable()
export class TestController{ 
    donneesVides()  : Promise<void>{    return callApi("TestController/donneesVides",{}); }
    impersonate(impersonation:Impersonation)  : Promise<void>{    return callApi("TestController/impersonate",impersonation); }
}
