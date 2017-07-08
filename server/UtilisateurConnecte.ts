

import { ObjectID } from "mongodb";
import { Utilisateur } from "./_model/Utilisateur";
import { Persistance } from "./db/Persistance";

export class UtilisateurConnecte
{
    id:ObjectID;
    private _utilisateur?:Utilisateur;

    async utilisateur():Promise<Utilisateur>
    {
        if (this.id == null)
            throw Error("Tentative d'acces à un utilisteur non conncecté");
        if (this._utilisateur != null)
            return this._utilisateur;

        this._utilisateur = await Persistance.utilisateurs().findOne({_id: this.id});
        return this._utilisateur;
    }
}