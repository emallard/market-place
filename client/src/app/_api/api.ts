
    export class ObjectID 
    {
        _id:string;
    }

    class Buffer
    {

    }
    
    import { Injectable } from '@angular/core';
    import { Api } from "app/_core/api";
    
@Injectable()
export class AttachmentObject{ 
    filename:string;
    cid:string;
    path:string;
    content:string | Buffer | ReadableStream;
    encoding:string;
    contentType:string;
    contentDisposition:string;
}

@Injectable()
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

@Injectable()
export class Vendeur{ 
    _id:ObjectID;
}

@Injectable()
export class ProfilUtilisateur{ 
    nom:string;
    prenom:string;
    genre:string;
}

@Injectable()
export class Utilisateur{ 
    _id:ObjectID;
    email:string;
    password:string;
    dateInscription:Date;
    estUnVendeur:boolean;
    estUnAdmin:boolean;
    profil:ProfilUtilisateur;
}

@Injectable()
export class TokenMotDePasse{ 
    token:string;
    expiration:Date;
    email:string;
    utilise:boolean;
}

@Injectable()
export class Reference{ 
    _id:ObjectID;
    titre:string;
    texte:string;
    category:string;
}

@Injectable()
export class Annonce{ 
    _id:ObjectID;
    idUtilisateur:ObjectID;
    lieu:string;
    date:Date;
    idReference:ObjectID;
    titreReference:string;
}

@Injectable()
export class RechercheEmailsEnvoyesA{ 
    aPartirDe:Date;
    jusquA:Date;
    destinataire:string;
}

@Injectable()
export class AdminController{ 
    rechercherEmailsEnvoyes(recherche:RechercheEmailsEnvoyesA)  : Promise<Email[]>{    return Api.appeler("AdminController/rechercherEmailsEnvoyes",recherche); }
    rechercherVendeurs()  : Promise<Utilisateur[]>{    return Api.appeler("AdminController/rechercherVendeurs",{}); }
    ajouterReference(reference:Reference)  : Promise<void>{    return Api.appeler("AdminController/ajouterReference",reference); }
    listeReferences()  : Promise<Reference[]>{    return Api.appeler("AdminController/listeReferences",{}); }
}

@Injectable()
export class RechercheAnnonce{ 
    lieu:string;
    date:Date;
    reference:string;
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
    nom:string;
    prenom:string;
    genre:string;
}

@Injectable()
export class InformationUtilisateur{ 
    estConnecte:boolean;
    email:string;
    estUnVendeur:boolean;
    estUnAdmin:boolean;
    profil:ProfilUtilisateur;
}

@Injectable()
export class PublicController{ 
    rechercherAnnonces(recherche:RechercheAnnonce)  : Promise<Annonce[]>{    return Api.appeler("PublicController/rechercherAnnonces",recherche); }
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
export class ChangementDeMotDePasse{ 
    motDePasse:string;
    confirmationMotDePasse:string;
    token:string;
}

@Injectable()
export class UserController{ 
    inscrireVendeur(inscription:Inscription)  : Promise<void>{    return Api.appeler("UserController/inscrireVendeur",inscription); }
    informationUtilisateurConnecte()  : Promise<InformationUtilisateur>{    return Api.appeler("UserController/informationUtilisateurConnecte",{}); }
    seConnecter(connexion:Connexion)  : Promise<void>{    return Api.appeler("UserController/seConnecter",connexion); }
    demanderUnMotDePasseParEmail(email:string)  : Promise<void>{    return Api.appeler("UserController/demanderUnMotDePasseParEmail",email); }
    reinitialiserMotDePasse(changement:ChangementDeMotDePasse)  : Promise<void>{    return Api.appeler("UserController/reinitialiserMotDePasse",changement); }
}

@Injectable()
export class AjoutAnnonce{ 
    date:Date;
    lieu:string;
    idReference:ObjectID;
}

@Injectable()
export class VendeurController{ 
    tousLesAnnonces()  : Promise<Annonce[]>{    return Api.appeler("VendeurController/tousLesAnnonces",{}); }
    ajouterAnnonce(ajout:AjoutAnnonce)  : Promise<void>{    return Api.appeler("VendeurController/ajouterAnnonce",ajout); }
    listerReferences()  : Promise<Reference[]>{    return Api.appeler("VendeurController/listerReferences",{}); }
}

@Injectable()
export class Impersonation{ 
    email:string;
}

@Injectable()
export class TestController{ 
    donneesVides()  : Promise<void>{    return Api.appeler("TestController/donneesVides",{}); }
    impersonate(impersonation:Impersonation)  : Promise<void>{    return Api.appeler("TestController/impersonate",impersonation); }
    emailsEnvoyes()  : Promise<Email[]>{    return Api.appeler("TestController/emailsEnvoyes",{}); }
    seConnecterEnAdmin()  : Promise<void>{    return Api.appeler("TestController/seConnecterEnAdmin",{}); }
    seConnecter(email:string)  : Promise<void>{    return Api.appeler("TestController/seConnecter",email); }
    seDeconnecter(email:string)  : Promise<void>{    return Api.appeler("TestController/seDeconnecter",email); }
}
