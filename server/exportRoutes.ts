import * as ts from "typescript";
import * as fs from "fs";
import { getCombinedModifierFlags } from "typescript";


/** Generate documentation for all classes in a set of .ts files */
function generateDocumentation(fileNames: string[], options: ts.CompilerOptions, outputFile): void {
    // Build a program using the set of root file names in fileNames
    let program = ts.createProgram(fileNames, options);
    
    // Get the checker, we will use it to find more about classes
    let checker = program.getTypeChecker();

    let output: string[] = [];

    output.push(`
         import express = require("express");
         let router = express.Router();
         module.exports = router;
         
         import {Session} from './Session';
         import {UtilisateurConnecte} from './UtilisateurConnecte';
         import {ObjectID} from "mongodb";
         `);

         

    // Visit every sourceFile in the program    
    for (const sourceFile of program.getSourceFiles()) {
        

        if (sourceFile.fileName.indexOf('controllers') !=-1)
        {
            console.log(sourceFile.fileName);
            // Walk the tree to search for classes
            ts.forEachChild(sourceFile, visit);
        }
    }

    // print out the doc
    //fs.writeFileSync("classes.json", JSON.stringify(output, undefined, 4));
    fs.writeFileSync(outputFile, output.join('\n'));

    return;

    /** visit nodes finding exported classes */    
    function visit(node: ts.Node) {
        // Only consider exported nodes
        if (!isNodeExported(node)) {
            return;
        }

        if (node.kind === ts.SyntaxKind.InterfaceDeclaration) {
            let symbol = checker.getSymbolAtLocation((<ts.InterfaceDeclaration>node).name);
            output.push(serializeClass(symbol));
        }

        if (node.kind === ts.SyntaxKind.ClassDeclaration) {
            // This is a top level class, get its symbol
            let symbol = checker.getSymbolAtLocation((<ts.ClassDeclaration>node).name);
            output.push(serializeClass(symbol));
            //serializeClass2(<ts.ClassDeclaration>node);
        }
        else if (node.kind === ts.SyntaxKind.ModuleDeclaration) {
            // This is a namespace, visit its children
            ts.forEachChild(node, visit);
        }
    }


    function serializeClass2(node : ts.ClassDeclaration)
    {
        console.log('---- serialize class 2');
        console.log(node.name.text);
        node.forEachChild(n => console.log(n.modifiers != null ? n.modifiers.map(m=>m != null ? m.kind : '') : ''));
        console.log('---- end serialize class 2');
    }

    /** Serialize a class symbol infomration */
    function serializeClass(symbol: ts.Symbol) : string {
        
        console.log(symbol.getName());
        console.log(ts.displayPartsToString(symbol.getDocumentationComment()));
        var o = 'import {'+symbol.getName()+'} from "./controllers/' + symbol.getName() +'"\n';
        symbol.members.forEach(memberSymbol=>
        {
            var osymbol = serializeSymbol(symbol.getName(), memberSymbol);
            if (osymbol)
                o += osymbol;
        });
        return o;
    }

    /** Serialize a symbol into a json object */    
    function serializeSymbol(className:string, symbol: ts.Symbol) : string {

        
        //console.log('flags : ', symbol.getFlags());

        var type = checker.typeToString(checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration));

        var arrow = type.indexOf('=>');
        if (arrow != -1)
        {
            var callSignatures = checker.getSignaturesOfType(checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration), ts.SignatureKind.Call);
        
            if (callSignatures.length > 0)
                return callSignatures.map(s=>serializeSignature(className, symbol.getName(), s)).join('');
        }    
    }

    /** Serialize a signature (call or construct) */
    function serializeSignature(className:string, name:string, signature: ts.Signature) : string {
        var url = className + '/' + name;

        var parameters = signature.parameters;
        var returnType = checker.typeToString(signature.getReturnType());

        var transferredParameters:string;
        if (parameters.length == 0)
            transferredParameters = '';
        else
            transferredParameters = '<any> req.body';
        
        return '\nrouter.post("/' + url + '", async function (req: express.Request, res: express.Response, next: express.NextFunction)\n'
            +'{ var c = new ' + className + '();\n'
            +"var session = new Session();\n"
            +"session.req = req;\n"
            +"c['session'] = session\n"
            +"var utilisateurConnecte = new UtilisateurConnecte();\n"
            +"if (req.session.userId == null) utilisateurConnecte.id = null;\n"
            +"else utilisateurConnecte.id = new ObjectID(req.session.userId)\n"
            +"c['utilisateurConnecte'] = utilisateurConnecte;\n"
            +"var retour = await c."+name+"("+transferredParameters+");\n"
            +"res.send(JSON.stringify(retour));\n"
            +"});\n\n"
        
        /*
            
            documentation: ts.displayPartsToString(signature.getDocumentationComment())
        });*/
    }

    /** True if this is visible outside this file, false otherwise */
    function isNodeExported(node: ts.Node): boolean {
        return true;
        //return (node.flags & ts.NodeFlags.Export) !== 0 || (node.parent && node.parent.kind === ts.SyntaxKind.SourceFile);
    }
}

/*
generateDocumentation(process.argv.slice(2), {
    target: ts.ScriptTarget.ES5, module: ts.ModuleKind.CommonJS
});
*/

//var files = fs.readdirSync('_api').map(f=>'_api/'+f);
var files = fs.readdirSync('controllers').map(f=>'controllers/'+f);
console.log(files);

generateDocumentation(
    files, {
    target: ts.ScriptTarget.ES5, module: ts.ModuleKind.CommonJS,
    },
    './routes.ts');
