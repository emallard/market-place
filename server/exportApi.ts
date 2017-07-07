import * as ts from "typescript";
import * as fs from "fs";


/** Generate documentation for all classes in a set of .ts files */
function generateDocumentation(fileNames: string[], options: ts.CompilerOptions, outputFile): void {
    // Build a program using the set of root file names in fileNames
    let program = ts.createProgram(fileNames, options);
    
    // Get the checker, we will use it to find more about classes
    let checker = program.getTypeChecker();

    let output: string[] = [];

    output.push(`
    export class ObjectID 
    {
        _id:string;
    }

    import { Injectable } from '@angular/core';
    import { Api } from "app/_core/api";
    `)

    // Visit every sourceFile in the program    
    for (const sourceFile of program.getSourceFiles()) {
        

        if (sourceFile.fileName.indexOf('_api') != -1 
        || sourceFile.fileName.indexOf('_model') !=-1
        || sourceFile.fileName.indexOf('controllers') !=-1)
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
            // No need to walk any further, class expressions/inner declarations
            // cannot be exported
        }
        else if (node.kind === ts.SyntaxKind.ModuleDeclaration) {
            // This is a namespace, visit its children
            ts.forEachChild(node, visit);
        }
    }

    /** Serialize a symbol into a json object */    
    function serializeSymbol(className:string, symbol: ts.Symbol) : string {

        var type = checker.typeToString(checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration));

        var arrow = type.indexOf('=>');
        if (arrow != -1)
        {
            var callSignatures = checker.getSignaturesOfType(checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration), ts.SignatureKind.Call);
        
            if (callSignatures.length > 0)
                return callSignatures.map(s=>serializeSignature(className, symbol.getName(), s)).join('');

            /*
            var returnedType = 
            type = type.replace(':', '').replace('=>',':');
            return 'async ' + type + ' { };\n ';
            */
        }
        else
        {
            if (className.indexOf('Controller') == -1)
                return '    ' + symbol.getName() + ':' + type + ';\n'
            else
                return '';
        }
            
    }

    /** Serialize a class symbol infomration */
    function serializeClass(symbol: ts.Symbol) : string {
        
        console.log(symbol.getName());
        console.log(ts.displayPartsToString(symbol.getDocumentationComment()));

        var o = '@Injectable()\n' 
        + 'export class ' + symbol.getName() + '{ \n';
        symbol.members.forEach(memberSymbol=>
        {
            o += serializeSymbol(symbol.getName(), memberSymbol);

            /*
            console.log(memberSymbol.getName());
            var type = checker.getTypeOfSymbolAtLocation(memberSymbol, memberSymbol.valueDeclaration);
            console.log(checker.typeToString(type));
            */
        });

        o += '}\n';
        return o;
    }

    /** Serialize a signature (call or construct) */
    function serializeSignature(className:string, name:string, signature: ts.Signature) : string {
        
        //var url = className.replace('Controller', '');
        var url = className + '/' + name;

        var parameters = signature.parameters;
        var returnType = checker.typeToString(signature.getReturnType());

        var transferredParameters:string[]
        if (parameters.length == 0)
            transferredParameters = ['"' + url + '"', '{}'];
        else
            transferredParameters = ['"' + url + '"'].concat(parameters.map(p=>p.getName()));
        
        return '    ' + name + '('
        + parameters.map(p=>
        {
            var type = checker.typeToString(checker.getTypeOfSymbolAtLocation(p, p.valueDeclaration));
            return p.getName() + ':' + type;
        }).join(',')
        +') '
        +' : ' + returnType
        +'{ ' 
        + '   return Api.appeler('+transferredParameters.join(',')+'); '
        + '}\n';
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
    '../client/src/app/_api/api.ts');
