import { Db } from "mongodb";
import mongodb = require("mongodb");
import config = require('../config');
import { Produit } from "../_model/Produit";
import { Utilisateur } from "../_model/Utilisateur";
import { Email } from "../services/Email";
import { Config } from "../config";
import { TokenMotDePasse } from "../_model/TokenMotDePasse";

export class Persistance {

    static _singleton:Persistance;
    static singleton():Persistance
    {
        if (Persistance._singleton == null)
            Persistance._singleton = new Persistance();
        return Persistance._singleton;
        
    }

    static mongodb():Db
    {
        return Persistance.singleton()._mongodb;
    }

    static utilisateurs():mongodb.Collection<Utilisateur>
    {
        return Persistance.singleton()._mongodb.collection('utilisateurs');
    }

    static produits():mongodb.Collection<Produit>
    {
        return Persistance.singleton()._mongodb.collection('produits');
    }

    static emails():mongodb.Collection<Email>
    {
        return Persistance.singleton()._mongodb.collection('emails');
    }

     static tokensMotDePasse():mongodb.Collection<TokenMotDePasse>
    {
        return Persistance.singleton()._mongodb.collection('tokensMotDePasse');
    }

    static async drop()
    {
        await Persistance.singleton()._mongodb.dropDatabase();
        Persistance.singleton().configure();
        //Persistance._singleton = new Persistance();
    }

    private _mongodb:Db;

    async init()
    {
        var MongoClient = mongodb.MongoClient;
        var url = Config.singleton().mongo_url;
        this._mongodb = await MongoClient.connect(url);
        console.log('mongodb connected');
        this.configure();
    }

    configure()
    {
        Persistance.produits().createIndex({nom:"text"});
    }

    collection<T>(type:{new():T}) : mongodb.Collection<T>
    {
        var collection = type.toString().split(' ')[1];
        //console.log('collection : ' + collection);
        return this._mongodb.collection<T>(collection);
    }
}

/*
export class ICollection<T>
{
    constructor()
    {

    }
    findOneById(id:string) : Promise<T> ;
    findOne(query:any) : Promise<T> ;
    find(query:any) : Promise<T[]>;
    insertOne(t:T) : Promise<string>;
    updateOne(t:T) : Promise<void>;
    deleteOne(t:T) : Promise<void>;
}*/
