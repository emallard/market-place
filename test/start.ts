import app = require("./app");
import debugModule = require("debug");
import http = require("http");


import * as webdriver from "selenium-webdriver";
import * as firefox from "selenium-webdriver/firefox";
import { By } from "selenium-webdriver";

//client.end();
var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .usingServer('http://localhost:4444/wd/hub')
    .build();

async function go()
{
    await driver.get("http://localhost:4200");
    await driver.findElement(By.xpath("//*[contains(text(), 'Devenir vendeur')]")).click();
    await driver.findElement(By.css('[name="email"]')).sendKeys('a@example.com');
}
go();
/*



let debug = debugModule("logintest:server");

let port = normalizePort(process.env.PORT || 4201);
app.set("port", port);

let server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val: any) {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

function onError(error: any) {
    if (error.syscall !== "listen") {
        throw error;
    }

    let bind = typeof port === "string"
        ? "Pipe " + port
        : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    let addr = server.address();
    let bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr.port;
    console.log("Listening on " + bind);
}
*/