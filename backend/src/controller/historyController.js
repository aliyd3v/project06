const { Order } = require("../model/orderModel")
const { errorHandling } = require("./errorController")

exports.getAllHistory = async (req, res) => {
    try {
        const histories = await Order.find({ status: 'Delivered' })
        if (!histories.length) {
            return res.status(200).send({
                success: true,
                error: false,
                data: { message: "History is empty." }
            })
        }
        return res.status(200).send({
            success: true,
            error: fase,
            data: {
                message: "History getted is successful.",
                histories
            }
        })
    } catch (error) {
        errorHandling(error, res)
    }
}