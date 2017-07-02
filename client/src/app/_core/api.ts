export class ApiFunction<In, Out>
{
  constructor(private url:string)
  {

  }

  async appeler(args: In): Promise<Out>
  {
    return await Api.appeler(this.url, args);
  }
}

export class Api
{

    static async appeler<T>(url, parameters) : Promise<any>
    {
        console.log('appeler ' + url);
        var myHeaders = new Headers();

        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            myHeaders.append('Authorization', 'Bearer ' + currentUser.token);
        }
        
        var reponse = await fetch('http://localhost:3000/' + url, 
        { 
            method: "POST",
            body: JSON.stringify(parameters),
            headers : myHeaders
        });

        var result = await reponse.json();
       
        if (result['token'] != undefined)
        {
            console.log('result token', result['token']);
            localStorage.setItem('currentUser', JSON.stringify({token: result['token']}));
        }

        return <T>result;
    }
}