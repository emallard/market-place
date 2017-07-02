import { binding, given, then, before } from "cucumber-tsflow";
import * as Request from 'request-promise-native';


@binding()
export class DonneesSteps {


    @given(/^un site vide$/)
    async givenPageDAccueil() {
        await Request.post('http://localhost:3000/TestController/donneesVides');
    }
    
    

}
