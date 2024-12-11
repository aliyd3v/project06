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
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verification Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f3f4f6;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        h1 {
            color: #333333;
        }

        p {
            color: #555555;
        }

        .verify-button {
            background-color: limegreen;
            color: white;
            font-size: 18px;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        .verify-button:hover {
            background-color: darkred;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Verify Your Email</h1>
        <p>Click the button below to verify your email address:</p>
        <form action="http://localhost:5050/verify/?token=${verifyUrl}" method="post">
            <button class="verify-button" type="submit">Verify</button>
        </form>
    </div>
</body>
</html>
`
  };
  transporter.sendMail(mailOptions);
}