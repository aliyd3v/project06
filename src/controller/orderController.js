const { Order } = require("../model/orderModel")
const { errorHandling } = require("./errorController")
const { matchedData, validationResult, Result } = require('express-validator')
const jwt = require('jsonwebtoken')
const { jwtSecretKey, domain } = require('../config/config')
const { validationController } = require("./validationController")
const { sendVerifyToEmail, sendSuccessMsgToEmail } = require("../helper/sendToMail")
const { TokenStore } = require("../model/tokenStoreModel")
const { succesMsgToHtml } = require("../helper/successMsgToHtml")
const { verifyFailedHtml } = require("../helper/verifyFailedHtml")
const { sendingOrderToTgChannel } = require("../helper/sendingOrderToTgChannel")
const { gettingMealsFromOrder } = require("../helper/gettingMealsFromOrder")

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
        const verifyUrl = `${domain}/verify/email-verification?token=${token}`

        // Sending verify message to customer email.
        sendVerifyToEmail(data.email, verifyUrl)

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
    const { params: { id }, query: { token } } = req
    try {
        if (id != 'email-verification') {
            // Responsing.
            return res.status(400).send(verifyFailedHtml)
        }
        // Checking token.        
        if (!token) {
            // Responsing.
            return res.status(400).send(verifyFailedHtml)
        }

        // Checking token for valid.
        const { error, data } = verifyToken(token)
        if (error) {
            // Responsing.
            return res.status(400).send(verifyFailedHtml)
        }
        if (!data.nonce) {
            // Responsing.
            return res.status(400).send(verifyFailedHtml)
        }
        const nonce = await TokenStore.findOne({ nonce: data.nonce })
        if (!nonce) {
            // Responsing.
            return res.status(400).send(verifyFailedHtml)
        }

        // Writing to database.
        const newOrder = await Order.create({
            customer_name: data.customer_name,
            phone: data.phone,
            email: data.email,
            meals: data.meals,
            status: "Pending"
        })

        // Deleting nonce from database for once using from token.
        await TokenStore.findByIdAndDelete(nonce._id)

        // Getting meals from order.
        const meals = await gettingMealsFromOrder(data.meals)

        // Sending order to telegram channel.
        const selectedPieceFromOrder = {
            id: newOrder._id,
            customer_name: data.customer_name,
            phone: data.phone,
            email: data.email,
            meals,
            status: "Pending",
            createdAt: newOrder.createdAt
        }
        sendingOrderToTgChannel(selectedPieceFromOrder)

        // Create success message to customer email.
        const html = succesMsgToHtml(data.customer_name)

        // Responsing with html.
        return res.status(200).send(html)
    }

    // Error handling.
    catch (error) {
        errorHandling(error, res)
    }
}

exports.getAllActualOrders = async (req, res) => {
    try {
        // Getting all orders with status "Pending".
        const orders = await Order.find({ status: "Pending" })

        // Responsing.
        return res.status(200).send({
            success: true,
            error: false,
            data: {
                message: "Orders with 'Pending' status getted successfully.",
                orders
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

        // Checking order for exists.
        if (!order) {
            // Responsing.
            return res.status(404).send({
                success: false,
                data: null,
                error: {
                    message: "Order is not found!"
                }
            })
        }

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

exports.markAsDelivered = async (req, res) => {
    const { params: { id } } = req
    try {
        // Checking id to valid.
        idChecking(req, res, id)

        // Getting an order from database by id.
        let order = await Order.findById(id)

        // Checking order for exists.
        if (!order) {
            // Responsing.
            return res.status(404).send({
                success: false,
                data: null,
                error: {
                    message: "Order is not found!"
                }
            })
        }

        // Writing update to database.
        order.status = 'Delivered'
        await Order.findByIdAndUpdate(id, order)

        // Responsing.
        return res.status(201).send({
            success: true,
            error: false,
            data: { message: "Order status has been updated successfully." }
        })
    } catch (error) {

    }
}