const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false, // 如果使用 TLS，設置為 true
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

const sendEmail = (to, subject, text, html) => {
    const mailOptions = {
        from: process.env.MAIL_USER,
        to,
        subject,
        text,
        html,
    };
    
    return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
