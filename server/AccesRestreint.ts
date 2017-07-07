 import express = require("express");
 import { Config } from "./config";
 let router = express.Router();
module.exports = router;

if (Config.singleton().motDePasseAccesRestreint != null)
{
    router.get('/acces-restreint', function(req, res, next)
    {
        req.session['BLAH'] = 'blah';
        res.send(`
            <html>
            <body>
            Acces restreint : mot de passe:

            <input type='password' id='pass'>
            <button onclick="buttonClick()">Acces</button>

            <script>
            function getQueryVariable(variable)
            {
                var query = window.location.search.substring(1);
                var vars = query.split("&");
                for (var i=0;i<vars.length;i++) {
                        var pair = vars[i].split("=");
                        if(pair[0] == variable){return pair[1];}
                }
                return(false);
            }

            function buttonClick() {
                var passValue = document.getElementById('pass').value;
                fetch("/acces-restreint",
                {
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    credentials: "same-origin",
                    method: "POST",
                    body: JSON.stringify({pass: passValue})
                })
                .then(function(res){ 
                    window.location=getQueryVariable('returnUrl');
                })

            }
            </script>
            </body>
            </html>
        `)
    });

        
    router.post('/acces-restreint', function(req, res, next)
    {
        req.session['accesRestreintOk'] = (req.body.pass == Config.singleton().motDePasseAccesRestreint);
        res.send();
    });


    router.use(function(req, res, next) {
        if (req.originalUrl != '/acces-restreint' && req.session['accesRestreintOk'] != true)
        {
            res.redirect('/acces-restreint?returnUrl=' + encodeURI(req.url));
        }
        else
            next();
    });
}