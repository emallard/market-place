
import express = require("express");

export class RegisterControllers
{
    addControllers<T>(app: express.Express, controller:{new ():T})
    {
        
        var c = new controller();
        var o = <any> c;
        console.log('addControllers' , this.getAllFuncs(c));
        for (var key in controller.prototype)
        {
            console.log(key);
            console.log(typeof(key).toString()); 
        }
    }

    addController<T>(app: express.Express, controller:{new ():T}, func:any)
    {
        var controllerName = controller.toString();
        var index1 = controllerName.indexOf(' ');
        var index2 = controllerName.indexOf('Controller');
        controllerName = controllerName.substring(index1+1, index2);

        var funcToString:string = func.toString();
        var funcName = funcToString.substring(funcToString.lastIndexOf('.')+1).trim();
        let router = express.Router();
        console.log('route ' + controllerName + '/' + funcName);

        router.post('/' + controllerName + '/' + funcName, async function (req: express.Request, res: express.Response, next: express.NextFunction) {
            {
                var c = new controller();
                c['req'] = req;
                var retour = await func(c).call(c, req.body);
                res.send(JSON.stringify(retour));
            }
        });
        app.use(router);
    }

    getAllFuncs(obj) {
        var props = [];

        do {
            props = props.concat(Object.getOwnPropertyNames(obj));
        } while (obj = Object.getPrototypeOf(obj));

        return props.sort().filter(function(e, i, arr) { 
        if (e!=arr[i+1] && obj != null && typeof obj[e] == 'function') return true;
        });
    }
}
 
