


export class Environnement
{
    nom:string;

    dev():boolean{
        return this.nom == 'DEV';
    }
}