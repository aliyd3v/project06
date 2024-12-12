const { Order } = require("../model/orderModel")
const { errorHandling } = require("./errorController")

exports.getAllHistory = async (req, res) => {
    try {
        // Getting all orders with status with "Delivered".
        const histories = await Order.find({ status: 'Delivered' })

        // Responsing.
        return res.status(200).send({
            success: true,
            error: fase,
            data: {
                message: "History getted is successful.",
                histories
            }
        })
    }

    // Error handling.
    catch (error) {
        errorHandling(error, res)
    }
}