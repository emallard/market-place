
    export class ObjectID 
    {
        _id:string;
    }

    class Buffer
    {

    }

    import { ApiCall } from "./ApiCall";
    
export class AttachmentObject{ 
    filename:string;
    cid:string;
    path:string;
    content:string | Buffer | ReadableStream;
    encoding:string;
    contentType:string;
    contentDisposition:string;
}

export class Email{ 
    date:Date;
    from:string;
    sender:string;
    to:string | string[];
    cc:string | string[];
    bcc:string | string[];
    replyTo:string;
    subject:string;
    text:string;
    html:string;
    headers:any;
    attachments:AttachmentObject[];
}

export class Vendeur{ 
    _id:ObjectID;
}

export class ProfilUtilisateur{ 
    nom:string;
    prenom:string;
    genre:string;
}

export class Utilisateur{ 
    _id:ObjectID;
    email:string;
    password:string;
    dateInscription:Date;
    estUnVendeur:boolean;
    estUnAdmin:boolean;
    profil:ProfilUtilisateur;
}

export class TokenMotDePasse{ 
    token:string;
    expiration:Date;
    email:string;
    utilise:boolean;
}

export class Reference{ 
    _id:ObjectID;
    titre:string;
    texte:string;
    category:string;
}

export class Annonce{ 
    _id:ObjectID;
    idUtilisateur:ObjectID;
    lieu:string;
    date:Date;
    idReference:ObjectID;
    titreReference:string;
}

export class RechercheEmailsEnvoyesA{ 
    aPartirDe:Date;
    jusquA:Date;
    destinataire:string;
}

export class AdminController{ 
    rechercherEmailsEnvoyes(recherche:RechercheEmailsEnvoyesA)  : Promise<Email[]>{    return ApiCall.callApi("AdminController/rechercherEmailsEnvoyes",recherche); }
    rechercherVendeurs()  : Promise<Utilisateur[]>{    return ApiCall.callApi("AdminController/rechercherVendeurs",{}); }
    ajouterReference(reference:Reference)  : Promise<void>{    return ApiCall.callApi("AdminController/ajouterReference",reference); }
    listeReferences()  : Promise<Reference[]>{    return ApiCall.callApi("AdminController/listeReferences",{}); }
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
    nom:string;
    prenom:string;
    genre:string;
}

export class InformationUtilisateur{ 
    estConnecte:boolean;
    email:string;
    estUnVendeur:boolean;
    estUnAdmin:boolean;
    profil:ProfilUtilisateur;
}

export class PublicController{ 
    rechercherAnnonces(recherche:RechercheProduit)  : Promise<Annonce[]>{    return ApiCall.callApi("PublicController/rechercherAnnonces",recherche); }
}

export class Connexion{ 
    email:string;
    password:string;
}

export class Token{ 
    token:string;
}

export class ChangementDeMotDePasse{ 
    motDePasse:string;
    confirmationMotDePasse:string;
    token:string;
}

export class UserController{ 
    inscrireVendeur(inscription:Inscription)  : Promise<void>{    return ApiCall.callApi("UserController/inscrireVendeur",inscription); }
    informationUtilisateurConnecte()  : Promise<InformationUtilisateur>{    return ApiCall.callApi("UserController/informationUtilisateurConnecte",{}); }
    seConnecter(connexion:Connexion)  : Promise<void>{    return ApiCall.callApi("UserController/seConnecter",connexion); }
    demanderUnMotDePasseParEmail(email:string)  : Promise<void>{    return ApiCall.callApi("UserController/demanderUnMotDePasseParEmail",email); }
    reinitialiserMotDePasse(changement:ChangementDeMotDePasse)  : Promise<void>{    return ApiCall.callApi("UserController/reinitialiserMotDePasse",changement); }
}

export class AjoutAnnonce{ 
    date:Date;
    lieu:string;
    idReference:ObjectID;
}

export class VendeurController{ 
    tousLesAnnonces()  : Promise<Annonce[]>{    return ApiCall.callApi("VendeurController/tousLesAnnonces",{}); }
    ajouterAnnonce(ajout:AjoutAnnonce)  : Promise<void>{    return ApiCall.callApi("VendeurController/ajouterAnnonce",ajout); }
    listerReferences()  : Promise<Reference[]>{    return ApiCall.callApi("VendeurController/listerReferences",{}); }
}

export class Impersonation{ 
    email:string;
}

export class TestController{ 
    donneesVides()  : Promise<void>{    return ApiCall.callApi("TestController/donneesVides",{}); }
    impersonate(impersonation:Impersonation)  : Promise<void>{    return ApiCall.callApi("TestController/impersonate",impersonation); }
    emailsEnvoyes()  : Promise<Email[]>{    return ApiCall.callApi("TestController/emailsEnvoyes",{}); }
    seConnecterEnAdmin()  : Promise<void>{    return ApiCall.callApi("TestController/seConnecterEnAdmin",{}); }
    seConnecter(email:string)  : Promise<void>{    return ApiCall.callApi("TestController/seConnecter",email); }
    seDeconnecter(email:string)  : Promise<void>{    return ApiCall.callApi("TestController/seDeconnecter",email); }
}
