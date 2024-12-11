const { Order } = require("../model/orderModel")
const { errorHandling } = require("./errorController")
const { matchedData, validationResult, Result } = require('express-validator')
const jwt = require('jsonwebtoken')
const { jwtSecretKey, MyTestEmail } = require('../config/config')
const { validationController } = require("./validationController")
const { sendToEmail } = require("../helper/sendToMail")
const { TokenStore } = require("../model/tokenStoreModel")

const generateTokenWithOrder = (payload) => {
    return jwt.sign(payload, jwtSecretKey, { expiresIn: '1h' });
}

const verifyToken = (token) => {
    return jwt.verify(token, jwtSecretKey, (error, decoded) => {
        return { data: decoded, error }
    })
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

        // Create nonce for once using from token.
        const nonce = crypto.randomUUID()
        await TokenStore.create({ nonce })

        // Order payload.
        const order = {
            customer_name: data.customer_name,
            email: data.email,
            phone: data.phone,
            meals: data.meals,
            nonce
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

exports.verifyTokenAndCreateOrder = async (req, res) => {
    const { query } = req
    try {
        // Getting token from URL.
        const fullToken = query.token;
        if (!fullToken) {
            return res.status(400).send('Token topilmadi!')
        }
        const token = new URLSearchParams(fullToken.split('?')[1]).get('token');

        // Checking token for valid.
        const { error, data } = verifyToken(token)
        if (error) {
            // Responsing.
            return res.status(400).send({
                success: false,
                data: null,
                error: {
                    message: "Verify failed!"
                }
            })
        }
        if (!data.nonce) {
            // Responsing.
            return res.status(400).send({
                success: false,
                data: null,
                error: {
                    message: "Verify failed!"
                }
            })
        }
        const nonce = await TokenStore.findOne({ nonce: data.nonce })
        if (!nonce) {
            // Responsing.
            return res.status(400).send({
                success: false,
                data: null,
                error: {
                    message: "Verify failed!"
                }
            })
        }

        // Writing to database.
        await Order.create({
            customer_name: data.customer_name,
            phone: data.phone,
            email: data.email,
            meals: data.meals,
            status: "Pending",
        })

        // Deleting nonce from database for once using from token.
        await TokenStore.findByIdAndDelete(nonce._id)

        // Responsing.
        return res.status(200).send({
            success: true,
            error: false,
            data: {
                message: "Verify complated successfully."
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
        // Getting all orders with status "Pending".
        const actualOrders = await Order.find({ status: "Pending" })

        // Responsing.
        return res.status(200).send({
            success: true,
            error: false,
            data: {
                message: "Orders with 'Pending' status getted successfully.",
                orders: actualOrders
            }
        })
    }

    // Error handling.
    catch (error) {
        errorHandling(error, res)
    }
}

exports.getOneOrder = async (req, res) => {
    const { params: { id } } = req
    try {
        // Checking id to valid.
        idChecking(req, res, id)

        // Getting an order from database by id.
        const order = await Order.findById(id)

        // Responsing.
        return res.status(200).send({
            success: true,
            error: false,
            data: {
                message: "Order getted successfully.",
                order
            }
        })
    } catch (error) {
        errorHandling(error, res)
    }
}