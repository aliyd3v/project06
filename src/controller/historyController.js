const { Booking } = require("../model/bookingModel")
const { Order } = require("../model/orderModel")
const { errorHandling } = require("./errorController")

exports.getAllHistory = async (req, res) => {
    try {
        // Getting all orders with status with "Delivered".
        const orders = await Order.find({ status: 'Delivered' }).sort({ createdAt: "desc" })
        const books = await Booking.find({ is_active: false }).sort({ date: "desc" })

        // Responsing.
        return res.status(200).send({
            success: true,
            error: false,
            data: {
                message: "History getted is successful.",
                history: { orders, books }
            }
        })
    }

    // Error handling.
    catch (error) {
        errorHandling(error, res)
    }
}