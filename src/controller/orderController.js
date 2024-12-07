const { transporter } = require("../helper/sendToMail")
const { Order } = require("../model/orderModel")
const { errorHandling } = require("./errorController")
const { matchedData, validationResult, Result } = require('express-validator')
const jwt = require('jsonwebtoken')
const { jwtSecretKey } = require('../config/config')

exports.createOder = async (req, res) => {
    try {
        // Result validation.
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const errorMessage = errors.array().map(error => error.msg)
            return res.status(400).send({
                success: false,
                data: null,
                error: { message: errorMessage }
            })
        }
        const data = matchedData(req)

        const newOrder = await Order.create({
            email: data.email,
            phone: data.phone,
            status: ['Checking'],
            meals: data.meals
        })

        // Generate URL with token for verifying email.
        function tokenGenerate(id) {
            return jwt.sign(id, jwtSecretKey)
        }
        const token = tokenGenerate(newOrder._id)
        const verifyUrl = `http://192.168.0.118:5050/verify/${token}`

        // Sending verify message to customer email.

        const mailOptions = {
            from: 'sizningemail@gmail.com', // Kimdan
            to: 'qabulqiluvchi@example.com', // Kimga
            subject: 'Salom dunyo!', // Mavzu
            text: 'Bu Nodemailer orqali yuborilgan email!' // Email matni
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Xatolik:', error);
            } else {
                console.log('Email jo‘natildi:', info.response);
            }
        });

        async function sendVerifyMessage(from, to) {
            return await transporter.sendMail({
                from,
                to,
                subject: `Verifying`,
                text: `For verifying click to button "Verify".`,
                html: `<a href="${verifyUrl}">Verify</a>`,
            })
        }
        const sending = await sendVerifyMessage('userg1570@gmail.com', 'userg1570@gmail.com')
        console.log(sending)

        return res.status(200).send({
            success: true,
            error: false,
            data: {
                message: "Verify URL has been sended to your email."
            }
        })
    } catch (error) {
        errorHandling(error, res)
    }
}

exports.getAllActualOrders = async (req, res) => {
    try {

    } catch (error) {
        errorHandling(error, res)
    }
}

exports.getOneOrder = async (req, res) => {
    try {

    } catch (error) {
        errorHandling(error, res)
    }
}

exports.updateOneOrder = async (req, res) => {
    try {

    } catch (error) {
        errorHandling(error, res)
    }
}

exports.deleteOneOrder = async (req, res) => {
    try {

    } catch (error) {
        errorHandling(error, res)
    }
}

exports.deleteAllOrders = async (req, res) => {
    try {

    } catch (error) {
        errorHandling(error, res)
    }
}