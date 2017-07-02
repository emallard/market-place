import { Db } from "mongodb";
import mongodb = require("mongodb");
import config = require('../config');

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

    static utilisateurs():mongodb.Collection
    {
        return Persistance.singleton()._mongodb.collection('utilisateurs');
    }

    static produits():mongodb.Collection
    {
        return Persistance.singleton()._mongodb.collection('produits');
    }

    static async drop()
    {
        await Persistance.singleton()._mongodb.dropDatabase();
        //Persistance._singleton = new Persistance();
    }

    private _mongodb:Db;

    constructor()
    {
        var MongoClient = mongodb.MongoClient;
        var url = config.mongo_url;
        MongoClient.connect(url).then(result => { this._mongodb = result; console.log('connected to mongodb ' + url);});
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
