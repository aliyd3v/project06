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

exports.createOrderWithVerification = async (req, res) => {
    try {
        // Result validation.
        const { data, error } = validationController(req, res)
        if (error) {
            // Responsing.
            return res.status(400).send({
                success: false,
                data: null,
                error: {
                    message: error
                }
            })
        }

        // Order payload.
        const order = {
            customer_name: data.customer_name,
            email: data.email,
            phone: data.phone,
            meals: data.meals
        }

        // Generate token with order for verify token.
        const token = generateTokenWithOrder(order)
        const verifyUrl = `http://localhost:5050/verify/?token=${token}`

        // Sending verify message to customer email.
        sendToEmail(data.email, verifyUrl)

        // Responsing.
        return res.status(200).send({
            success: true,
            error: false,
            data: {
                message: "Verify URL has been sended to your email."
            }
        })
    }

    // Error handling.
    catch (error) {
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