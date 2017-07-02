import express = require("express");

export class Session
{
    req: express.Request;
    getUserId() : string {return this.req.session.userId};
    setUserId(id:string) {this.req.session.userId = id};
}

