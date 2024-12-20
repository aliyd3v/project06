const { Booking } = require("../model/bookingModel");
const { Stol } = require("../model/stolModel");
const { errorHandling } = require("./errorController")

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
            // Responsing.
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
            // Responsing.
            return res.status(404).send({
                success: false,
                data: null,
                error: {
                    message: "Stol is not found!"
                }
            })
        }
        // Checking condidats on data.date
        const condidats = await Booking.find({ stol: stol._id })
        if (condidats) {
            const condidatsDates = condidats.map(condidat => condidat.date.toLocaleDateString())
            const existsDates = condidatsDates.includes(data.date.toLocaleDateString())
            if (existsDates == true) {
                // Responsing.
                return res.status(400).send({
                    success: false,
                    data: null,
                    error: {
                        message: `Stol is already booked for ${data.date.toLocaleDateString()}. Please book another stol or another date!`
                    }
                })
            }
        }

        // Create nonce for once using from token.
        const nonce = crypto.randomUUID()
        await TokenStore.create({ nonce })

        
        // Order payload.
        const bookingStol = {
            number: data.stol_number,
            date: data.date
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

    }

    // Error handling.
    catch (error) {
        errorHandling(error, res)
    }
}

exports.getOneBooking = async (req, res) => {
    try {

    }

    // Error handling.
    catch (error) {
        errorHandling(error, res)
    }
}