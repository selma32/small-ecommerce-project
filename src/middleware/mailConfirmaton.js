import nodemailer from "nodemailer"
import { emailTemplate } from "../utilities/emailTemplate.js";


// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "salmaahmed552005@gmail.com",
        pass: "evtt hvfz gxyy jrte",
    },
    tls:{
        rejectUnauthorized:false
    }
});

export async function mailConfirmation(email){
    const info = await transporter.sendMail({
        from: '"Salma" <salmaahmed552005@gmail.com>', // sender address
        to: email, // list of recipients
        subject: "Hello", // subject line
        text: "Hello world?", // plain text body
        html: emailTemplate(email), // HTML body
    });

    console.log("Message sent: %s", info.messageId);
}
