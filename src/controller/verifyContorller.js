const jwt = require('jsonwebtoken')
const { TokenStore } = require('../model/tokenStoreModel')
const { Order } = require('../model/orderModel')
const { succesMsgToHtml } = require('../helper/successMsgToHtml')
const { sendingOrderToTgChannel } = require('../helper/sendingOrderToTgChannel')
const { gettingMealsFromOrder } = require('../helper/gettingMealsFromOrder')
const { Booking } = require('../model/bookingModel')
const { sendingBookingToTgChannel } = require('../helper/sendingBookingToTgChannel')
const { errorHandling } = require('./errorController')
const { jwtSecretKey } = require('../config/config')
const { Stol } = require('../model/stolModel')
const { verifyFailedHtml } = require('../helper/verifyFailedHtml')

const verifyToken = (token) => {
    return jwt.verify(token, jwtSecretKey, (error, decoded) => {
        return { data: decoded, error }
    })
}

exports.verifyTokenAndCreateOrderOrBooking = async (req, res) => {
    const { params: { id }, query: { token } } = req
    try {
        if (id != 'email-verification') {
            // Responding.
            return res.status(400).send(verifyFailedHtml)
        }
        // Checking token.        
        if (!token) {
            // Responding.
            return res.status(400).send(verifyFailedHtml)
        }

        // Checking token for valid.
        const { error, data } = verifyToken(token)
        if (error) {
            // Responding.
            return res.status(400).send(verifyFailedHtml)
        }
        if (!data.nonce) {
            // Responding.
            return res.status(400).send(verifyFailedHtml)
        }
        const nonce = await TokenStore.findOne({ nonce: data.nonce })
        if (!nonce) {
            // Responding.
            return res.status(400).send(verifyFailedHtml)
        }

        // Writing to database.

        // For order.
        if (data.meals) {
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

            // Create success message to customer.
            const html = succesMsgToHtml(data.customer_name, 'Order')

            // Responsing with html.
            return res.status(200).send(html)
        }

        // For booking.
        else if (data.stol) {
            const stol = await Stol.findOne({ number: data.stol.number })

            const newBooking = await Booking.create({
                customer_name: data.customer_name,
                email: data.email,
                phone: data.phone,
                stol: stol._id,
                date: data.stol.date,
                is_active: true
            })

            // Deleting nonce from database for once using from token.
            await TokenStore.findByIdAndDelete(nonce._id)

            // Sending order to telegram channel.
            const selectedPieceFromBooking = {
                id: newBooking._id,
                customer_name: data.customer_name,
                phone: data.phone,
                email: data.email,
                stol: data.stol,
                status: "Active",
                date: data.date,
                createdAt: newBooking.createdAt
            }
            sendingBookingToTgChannel(selectedPieceFromBooking)

            // Create success message to customer.
            const html = succesMsgToHtml(data.customer_name, 'Booking')

            // Responsing with html.
            return res.status(200).send(html)
        }
    }

    // Error handling.
    catch (error) {
        errorHandling(error, res)
    }
}