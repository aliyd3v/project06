const { transporter } = require("../helper/sendToMail")
const { Order } = require("../model/orderModel")
const { errorHandling } = require("./errorController")
const { matchedData, validationResult, Result } = require('express-validator')

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

        // Sending verify message to customer email.
        // async function sendVerifyMessage(from, to) {
        //     return await transporter.sendMail({
        //         from,
        //         to,
        //         subject: `Message title`,
        //         text: `Plaintext version of the message`,
        //         html: `<p>HTML version of the message</p>`,
        //     })
        // }
        // const sending = await sendVerifyMessage('userg1570@gmail.com', 'nabiy5511@gmail.com')
        // console.log(sending)

        return res.status(200).send({
            success: true,
            error: false,
            data: {
                message: "Verify url has been sended successfull."
            }
        })
    } catch (error) {
        errorHandling(error, res)
    }
}

exports.getAllOrders = async (req, res) => {
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