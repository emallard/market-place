
import { ObjectID } from "mongodb";

export class DataCommune {
    code_insee:string;
    nom_département: string;
    nom_commune: string;
    codes_postaux: string;
    coordonnees: { type: "Point", coordinates:number[] };
}
