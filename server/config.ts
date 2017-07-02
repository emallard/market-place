import fs = require('fs');

interface config
{
    mongo_url : string;

}

var c:config = {
    mongo_url : 'mongodb://localhost:27017/marketplace'



};


if (fs.existsSync(__dirname + '/../config.override.json'))
{
    console.log('config.override.json YES');
    var fileContent = fs.readFileSync(__dirname + '/../config.override.json', 'utf8');
    var override = JSON.parse(fileContent);
    for (var key in override)
        c[key] = override[key];
}
else
    console.log('config.override.json NO');
    

export = c;