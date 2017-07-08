import * as fs from 'fs';
import * as path from 'path';
import { Persistance } from "../db/Persistance";
import { DataCommune } from "../_model/DataCommune";
var rl = require('readlines');
 
(async function() {
    await Persistance.singleton().init();

    var nomFichier = path.join(require('os').homedir(), 'eucircos_regions_departements_circonscriptions_communes_gps.csv');
    var exists = fs.existsSync(nomFichier);

    var lines = rl.readlinesSync(nomFichier);

    var champs:string[] = lines[0].split(';');
    var index_code_insee = champs.indexOf('code_insee');
    var index_nom_département = champs.indexOf('nom_département');
    var index_nom_commune = champs.indexOf('nom_commune');
    var index_codes_postaux = champs.indexOf('codes_postaux');
    var index_latitude = champs.indexOf('latitude');
    var index_longitude = champs.indexOf('longitude');
    
    Persistance.communes().drop();
    
    for(var i=1; i<lines.length; ++i){
        var valeurs = lines[i].split(';');
        
        if (valeurs.length != champs.length)
        {
            //console.log('length : ' + i);
            continue;
        }
            

        var dataCommune = new DataCommune();
        dataCommune.nom_commune = valeurs[index_nom_commune];
        dataCommune.nom_département = valeurs[index_nom_département];

        //if (dataCommune.nom_département == 'Vendée')
        //{
            dataCommune.code_insee = valeurs[index_code_insee];
            dataCommune.nom_département = valeurs[index_nom_département];
            dataCommune.codes_postaux = valeurs[index_codes_postaux];
            var longitude = parseFloat(valeurs[index_longitude]);
            var latitude = parseFloat(valeurs[index_latitude]);
            if (isNaN(longitude) || isNaN(latitude))
            {
                //console.log('Nan : ' + i);
                continue;
            }

            dataCommune.coordonnees = { type: "Point", coordinates: [longitude, latitude]};

            await Persistance.communes().insertOne(dataCommune);
        //}

        if(i%100 == 0)
            console.log(i);
    }
    
    console.log('create index');
    Persistance.communes().createIndex({coordonnees : "2dsphere" } );
})();

/*
db.<collection>.find( { <location field> :
                         { $near :
                           { $geometry :
                              { type : "Point" ,
                                coordinates : [ <longitude> , <latitude> ] } ,
                             $maxDistance : <distance in meters>
                      } } } )

db.communes.find({ coordonnees :
                         { $near :
                           { $geometry :
                              { type : "Point" ,
                                coordinates : [ -0.8, 46.483333	] } ,
                             $maxDistance : 5000
                      } } } )
*/