import { Db } from "mongodb";
import mongodb = require("mongodb");
import config = require('../config');
import { Produit } from "../_model/Produit";
import { Utilisateur } from "../_model/Utilisateur";

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

    static async drop()
    {
        await Persistance.singleton()._mongodb.dropDatabase();
        //Persistance._singleton = new Persistance();
    }

    private _mongodb:Db;

    async init()
    {
        var MongoClient = mongodb.MongoClient;
        var url = config.mongo_url;
        this._mongodb = await MongoClient.connect(url);
        console.log('mongodb connected');
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
