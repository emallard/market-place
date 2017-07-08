
import * as Nodemailer from 'nodemailer';

import { Persistance } from "../db/Persistance";
import { Email } from "../_api/Email";
import { Config } from "../config";


export class EnvoiEmail
{
    static _singleton:EnvoiEmail;
    static singleton():EnvoiEmail
    {
        if (EnvoiEmail._singleton == null)
            EnvoiEmail._singleton = new EnvoiEmail();
        return EnvoiEmail._singleton;
        
    }

    private smtpTransporter:Nodemailer.Transporter;

    private init()
    {
        var smtp = Config.singleton().smtp;
        if (smtp != null)
        {
            this.smtpTransporter = Nodemailer.createTransport({
                host: smtp.host,
                port: smtp.port,
                secure: smtp.secure, // secure:true for port 465, secure:false for port 587
                auth: {
                    user: smtp.user,
                    pass: smtp.pass
                }
            });
        }
    }


    public async envoyerEmail(email:Email)
    {
        email.date = new Date();
        
        // persistance sans les pieces jointes
        var savedAttachments = email.attachments;
        email.attachments = null;
        Persistance.emails().insertOne(email);
        email.attachments = savedAttachments;

        if (this.smtpTransporter != null)
        {
            await this.smtpTransporter.sendMail(email);
        }
    }
}