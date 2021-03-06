
const fs = require('fs');
const fse = require('fs-extra')
const path = require('path');
const child_process = require('child_process');
const rimraf = require('rimraf');
const findRemoveSync = require('find-remove');

/*
repertoire de source ~/market-place
repertoire git poru deployer sur gandi : ~/gandi-market-place/default
*/


var targetDir = path.join(__dirname, '..', '..', 'gandi-market-place', 'default');

var sourceDir = path.join(__dirname, '..');
var sourceClientDir = path.join(sourceDir, 'client');
var sourceServerDir = path.join(sourceDir, 'server');


// clean current directory
console.log('clean ' + targetDir);
//child_process.execSync('git clean -d -x -f', { cwd: targetDir });
var files = fs.readdirSync(targetDir);
files.forEach((f) => {
    if (f != '.git' && f != '.gitignore')
    {
        rimraf.sync(path.join(targetDir, f))
    }
});


//child_process.execSync('git clean -d -x -f', { cwd: sourceDir });
//child_process.execSync('git pull', { cwd: sourceDir, stdio:[0,1,2] });

/*
child_process.execSync('npm install', { cwd: sourceClientDir, stdio:[0,1,2] });
*/
//child_process.execSync('ng build --target=production --environment=prod', { cwd: sourceClientDir, stdio:[0,1,2] });

console.log('copy dist angular');
fse.copySync(path.join(sourceClientDir, 'dist'), path.join(targetDir, 'client', 'dist'));

/*
child_process.execSync('npm install', { cwd: sourceServerDir, stdio:[0,1,2] });
child_process.execSync('tsc', { cwd: sourceServerDir, stdio:[0,1,2] });
*/

console.log('copy out-tsc du serveur');
fse.copySync(path.join(sourceServerDir, 'out-tsc'), path.join(targetDir, 'server', 'out-tsc'));

console.log('adaptation package.json');
// package.json : adaptation du "start""
var packageJson = fs.readFileSync(path.join(sourceServerDir, 'package.json'), 'utf8');
packageJson = packageJson.replace('"start": "node ./out-tsc/start.js"', '"start": "node ./server/out-tsc/start.js"');
fs.writeFileSync(path.join(targetDir, 'package.json'), packageJson);

console.log('remove all .map');
findRemoveSync(targetDir, {extensions: ['.map']})

