const { jwtSecretKey, domain } = require("../config/config");
const { sendVerifyToEmail } = require("../helper/sendToMail");
const { Booking } = require("../model/bookingModel");
const { Stol } = require("../model/stolModel");
const { TokenStore } = require("../model/tokenStoreModel");
const { errorHandling } = require("./errorController");
const { idChecking } = require("./idController");
const { validationController } = require("./validationController");
const jwt = require('jsonwebtoken')

const generateTokenWithBooking = (payload) => {
    return jwt.sign(payload, jwtSecretKey, { expiresIn: '1h' });
}

const verifyToken = (token) => {
    return jwt.verify(token, jwtSecretKey, (error, decoded) => {
        return { data: decoded, error }
    })
}

exports.createBookingWithVerification = async (req, res) => {
    try {
        // Result validation.
        const { data, error } = validationController(req, res)
        if (error) {
            // Responding.
            return res.status(400).send({
                success: false,
                data: null,
                error: {
                    message: error
                }
            })
        }

        // Checking stol_number and date for booking exists.
        const stol = await Stol.findOne({ number: data.stol_number })
        if (!stol) {
            // Responding.
            return res.status(404).send({
                success: false,
                data: null,
                error: {
                    message: "Stol is not found!"
                }
            })
        }
        // Checking condidats on current date.
        const existingBookings = await Booking.find({ stol: stol._id, date: data.date, is_active: true })
        if (existingBookings) {
            for (const existingBooking of existingBookings) {
                // Checking existing bookings on current time.
                const existingTimeStart = new Date(`${existingBooking.date} ${existingBooking.time_start}`)
                const existingTimeEnd = new Date(`${existingBooking.date} ${existingBooking.time_end}`)
                const newTimeStart = new Date(`${data.date} ${data.time_start}`)
                const newTimeEnd = new Date(`${data.date} ${data.time_end}`)
                console.log(existingTimeStart, existingTimeEnd, newTimeStart, newTimeEnd)
                if (newTimeStart < existingTimeEnd && newTimeEnd > existingTimeStart) {
                    // Responding.
                    return res.status(400).send({
                        success: false,
                        data: null,
                        error: {
                            message: `Stol is already booked for current time. Please book another stol or another time!`
                        }
                    })
                }
            }
        }

        // Create nonce for once using from token.
        const nonce = crypto.randomUUID()
        await TokenStore.create({ nonce })


        // Order payload.
        const bookingStol = {
            number: data.stol_number,
            date: data.date,
            time_start: data.time_start,
            time_end: data.time_end
        }
        const booking = {
            customer_name: data.customer_name,
            email: data.email,
            phone: data.phone,
            stol: bookingStol,
            nonce
        }

        // Generate token with order for verify token.
        const token = generateTokenWithBooking(booking)
        const verifyUrl = `${domain}/verify/email-verification?token=${token}`

        // Sending verify message to customer email.
        sendVerifyToEmail(data.email, verifyUrl)

        // Responding.
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

exports.checkBookingForAvailability = async (req, res) => {
    try {

    }

    // Error handling.
    catch (error) {
        errorHandling(error, res)
    }
}

exports.getAllActiveBooking = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('stol').sort({ date: "desc" })/*.limit(10)*/

        // Responding.
        return res.status(200).send({
            success: true,
            error: false,
            data: {
                message: "Getted all bookings with active status.",
                bookings
            }
        })
    }

    // Error handling.
    catch (error) {
        errorHandling(error, res)
    }
}

exports.getOneBooking = async (req, res) => {
    const { params: { id } } = req
    try {
        // Checking id to valid.
        const idError = idChecking(req, id)
        if (idError) {
            // Responding.
            return res.status(400).send({
                success: false,
                data: null,
                error: idError
            })
        }

        // Geting a booking from database via id and checking for existence.
        const booking = await Booking.findById(id).populate('stol')
        if (!booking) {
            // Responding.
            return res.status(404).send({
                success: false,
                data: null,
                error: {
                    message: "Booking is not found!"
                }
            })
        }

        // Responding.
        return res.status(200).send({
            success: true,
            error: false,
            data: {
                message: "Booking getted successfully.",
                booking
            }
        })
    }

    // Error handling.
    catch (error) {
        errorHandling(error, res)
    }
}

exports.deactivateBooking = async (req, res) => {
    const { params: { id } } = req
    try {
        // Checking id to valid.
        const idError = idChecking(req, id)
        if (idError) {
            // Responding.
            return res.status(400).send({
                success: false,
                data: null,
                error: idError
            })
        }

        // Geting a booking from database via id and checking for existence.
        const booking = await Booking.findById(id).populate('stol')
        if (!booking) {
            // Responding.
            return res.status(404).send({
                success: false,
                data: null,
                error: {
                    message: "Booking is not found!"
                }
            })
        }

        // Writing changes to database.
        booking.is_active = false
        await Booking.findByIdAndUpdate(id, booking)

        // Responding.
        return res.status(200).send({
            success: true,
            error: false,
            data: { message: "Booking has been deactivated successfully." }
        })
    }

    // Error handling.
    catch (error) {
        errorHandling(error, res)
    }
}

exports.deleteAllBookings = async (req, res) => {
    try {
        // Checking bookings for existence.
        const bookings = await Booking.find()
        if (bookings) {
            // Deleting bookings from database.
            await Booking.deleteMany()
        }

        // Responding.
        return res.status(200).send({
            success: true,
            error: false,
            data: { message: "Bookings have been deleted successfully." }
        })
    }

    // Error handling.
    catch (error) {
        errorHandling(error, res)
    }
}