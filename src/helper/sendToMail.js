const nodemailer = require('nodemailer')
const { MyTestEmail, MyTestEmailPassword } = require('../config/config')

exports.transporter = nodemailer.createTransport({
    auth: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        service: 'gmail',
        auth: {
            user: MyTestEmail,
            pass: MyTestEmailPassword
        }
    }
})
