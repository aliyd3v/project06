const nodemailer = require('nodemailer');
const { MyTestEmail, MyTestEmailPassword } = require('../config/config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: MyTestEmail,
    pass: MyTestEmailPassword
  }
});

exports.sendToEmail = (customerEmail, verifyUrl) => {
  const mailOptions = {
    from: MyTestEmail,
    to: customerEmail,
    subject: 'Tasdiqlash uchun link',
    text: `Tasdiqlash uchun quyidagi linkni bosing: ${verifyUrl}`
  };
  transporter.sendMail(mailOptions);
}