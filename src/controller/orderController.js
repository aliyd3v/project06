const { Order } = require("../model/orderModel")
const { errorHandling } = require("./errorController")
const { matchedData, validationResult, Result } = require('express-validator')
const jwt = require('jsonwebtoken')
const { jwtSecretKey, MyTestEmail } = require('../config/config')
const { validationController } = require("./validationController")
const { sendToEmail } = require("../helper/sendToMail")

const generateTokenWithOrder = (payload) => {
    return jwt.sign(payload, jwtSecretKey, { expiresIn: '1h' });
}

exports.createOder = async (req, res) => {
    try {
        // Result validation.
        const data = validationController(req, res)

        const order = {
            customer_name: data.customer_name,
            email: data.email,
            phone: data.phone,
            meals: data.meals
        }

        const token = generateTokenWithOrder(order)
        const verifyUrl = `http://localhost:5050/verify/?token=${token}`

        const result = sendToEmail(data.email, verifyUrl)
        if (!result) {
            return res.status(400).send({
                success: false,
                data: null,
                error: {
                    message: "Error sending message to email!"
                }
            })
        }

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

exports.deleteAllOrders = async (req, res) => {
    try {

    } catch (error) {
        errorHandling(error, res)
    }
}