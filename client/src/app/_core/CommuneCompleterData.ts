import { Injectable } from '@angular/core';
import { CompleterData, CompleterItem } from "ng2-completer";
import { Subject } from "rxjs/Subject";
import { PublicController, RechercheAnnonce } from "app/_api/api";



export class CommuneCompleterData extends Subject<CompleterItem[]> implements CompleterData {
    constructor(private publicController:PublicController) {
        super();
    }
    public async search(term: string): Promise<void> {
        let recherche = new RechercheAnnonce();
        recherche.lieu = term;
        let results = (await this.publicController.autocompletionCommune(recherche))
        let matches: CompleterItem[] = results.map(r => {return {title: r} as CompleterItem;});
        this.next(matches);
    }

    public cancel() {
        // Handle cancel
    }
}