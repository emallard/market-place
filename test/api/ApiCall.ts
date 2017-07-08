import * as Request from 'request-promise-native';

export class ApiCall
{
    static myRequest = Request.defaults({jar:true});

    static resetRequest()
    {
        ApiCall.myRequest = Request.defaults({jar:true});
    }

    static async callApi<T>(url, parameters) : Promise<any>
    {
        //console.log('envoi', parameters);
        var retour = await ApiCall.myRequest.post('http://localhost:3000/' + url, {body: JSON.stringify(parameters)});
        //console.log('retour', retour);

        return retour;
    }
}
     