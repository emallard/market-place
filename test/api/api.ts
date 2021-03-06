
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

export class DataCommune{ 
    code_insee:string;
    nom_département:string;
    nom_commune:string;
    codes_postaux:string;
    coordonnees:{ type: "Point"; coordinates: number[]; };
}

export class RechercheAnnonce{ 
    lieu:string;
    date:Date;
    reference:string;
}

export class LogRecherche{ 
    lieu:string;
    date:Date;
    reference:string;
    dateInsertion:Date;
    idUtilisateur:ObjectID;
}

export class RechercheEmailsEnvoyesA{ 
    aPartirDe:Date;
    jusquA:Date;
    destinataire:string;
}

export class Csv{ 
    contenu:string;
}

export class AdminController{ 
    rechercherEmailsEnvoyes(recherche:RechercheEmailsEnvoyesA)  : Promise<Email[]>{    return ApiCall.callApi("AdminController/rechercherEmailsEnvoyes",recherche); }
    rechercherVendeurs()  : Promise<Utilisateur[]>{    return ApiCall.callApi("AdminController/rechercherVendeurs",{}); }
    ajouterReference(reference:Reference)  : Promise<void>{    return ApiCall.callApi("AdminController/ajouterReference",reference); }
    ajouterListeReferencesEnCsv(csv:Csv)  : Promise<void>{    return ApiCall.callApi("AdminController/ajouterListeReferencesEnCsv",csv); }
    listeReferences()  : Promise<Reference[]>{    return ApiCall.callApi("AdminController/listeReferences",{}); }
    listeAnnonces()  : Promise<Annonce[]>{    return ApiCall.callApi("AdminController/listeAnnonces",{}); }
    listeVendeurs()  : Promise<Utilisateur[]>{    return ApiCall.callApi("AdminController/listeVendeurs",{}); }
    listeEmails()  : Promise<Email[]>{    return ApiCall.callApi("AdminController/listeEmails",{}); }
    listeLogRecherches()  : Promise<LogRecherche[]>{    return ApiCall.callApi("AdminController/listeLogRecherches",{}); }
    mettreAJourCommunes(csv:Csv)  : Promise<string>{    return ApiCall.callApi("AdminController/mettreAJourCommunes",csv); }
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

export class UrlDto{ 
    url:string;
}

export class PublicController{ 
    rechercherAnnonces(recherche:RechercheAnnonce)  : Promise<Annonce[]>{    return ApiCall.callApi("PublicController/rechercherAnnonces",recherche); }
    rechercherAnnoncesParUrl(url:UrlDto)  : Promise<Annonce[]>{    return ApiCall.callApi("PublicController/rechercherAnnoncesParUrl",url); }
    obtenirUrlDeRecherche(recherche:RechercheAnnonce)  : Promise<UrlDto>{    return ApiCall.callApi("PublicController/obtenirUrlDeRecherche",recherche); }
    autocompletionCommune(recherche:RechercheAnnonce)  : Promise<string[]>{    return ApiCall.callApi("PublicController/autocompletionCommune",recherche); }
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
