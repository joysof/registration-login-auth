import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()


const transporter = nodemailer.createTransport({
    host : 'smtp-relay.brevo.com',
    port : 587,
     secure : false ,
    auth :{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});

 // Transporter verify করা
transporter.verify((error, success) => {
    if (error) console.log('SMTP Error:', error);
    else console.log('SMTP server ready to send emails');
});

export default transporter