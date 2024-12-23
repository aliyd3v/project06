const { Booking } = require("../model/bookingModel")
const { Order } = require("../model/orderModel")
const { errorHandling } = require("./errorController")

exports.getAllHistory = async (req, res) => {
    try {
        // Getting all orders with status with "Delivered".
        const orders = await Order.find({ status: 'Delivered' }).sort({ createdAt: "desc" })
        const bookings = await Booking.find({ is_active: false }).sort({ date: "desc" })

        // Responding.
        return res.status(200).send({
            success: true,
            error: false,
            data: {
                message: "History getted is successful.",
                history: { orders, bookings }
            }
        })
    }

    // Error handling.
    catch (error) {
        errorHandling(error, res)
    }
}