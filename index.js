const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 3333;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yugalramesh6832@gmail.com',
        pass: process.env.PASSWORD,
    }
});

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send('All fields are required!');
    }

    const mailOptions = {
        from: email,
        to: 'yugalramesh6832@gmail.com',
        subject: `Message from ${name}`,
        text: `Message from ${name} 
        ${message} \n
        My name is ${name}.
        I am Full Stack Web Developer From Surat.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email: ' + error.toString());
        }
        res.send('Email sent successfully!');
    });
});

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});
