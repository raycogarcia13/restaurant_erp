const nodemailer = require("nodemailer");

async function myCustomMethod(ctx) {
    let cmd = await ctx.sendCommand(
        'AUTH PLAIN ' +
        Buffer.from(
            '\u0000' + ctx.auth.credentials.user + '\u0000' + ctx.auth.credentials.pass,
            'utf-8'
        ).toString('base64')
    );

    if (cmd.status < 200 || cmd.status >= 300) {
        throw new Error('Failed to authenticate user: ' + cmd.text);
    }
}

async function sendMail(to, messageT = '', messageH = '', subject = 'Hello ✔',attachments= null,cc=null, callback = null) {

     let mail = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
        tls: {
            maxVersion: 'TLSv1.3',
            minVersion: 'TLSv1.2',
            rejectUnauthorized: false
        }
    });

    try{
        // send mail with defined transport object
        let info = await mail.sendMail({
            from: `"Sanyi" <${process.env.MAIL_USERNAME}>`,
            to: to, // list of receivers
            subject: subject, // Subject line
            text: messageT, // plain text body
            html: messageH, // html body,
            attachments,
            cc
        });

        if(callback)
            callback()

            console.log("Message sent: %s", info.messageId);
    }catch(e){
        if(callback)
            callback()
    }


}



module.exports = {
    sendMail
}