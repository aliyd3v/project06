const { jwtSecretKey } = require("../config/config")
const { errorHandling } = require("../controller/errorController")
const jwt = require("jsonwebtoken")
const { Admin } = require("../model/userModel")
const { idChecking } = require("../controller/idController")

const resForbidden = (res) => {
    return res.status(403).send({
        success: false,
        data: null,
        error: { message: "Access denied. Invalid token!" }
    })
}

exports.jwtAccessMiddleware = async function (req, res, next) {
    try {
        // Checking header authorization.
        const authHeader = req.headers.authorization
        if (!authHeader) {
            // Responsing.
            return resForbidden(res)
        }

        //Checking token for valid.
        const token = authHeader.split(' ')[1]
        if (!token) {
            // Responsing.
            return resForbidden(res)
        }
        const { id } = jwt.verify(token, jwtSecretKey, (error, decoded) => {
            if (error) {
                // Responsing.
                return resForbidden(res)
            }
            return decoded
        })

        // Checking id to valid.
        const { idError } = idChecking(req, id)
        if (idError) {
            // Responsing.
            return res.status(400).send({
                success: false,
                data: null,
                error: idError
            })
        }
        const admin = await Admin.findById(id)
        if (!admin) {
            // Responsing.
            return resForbidden(res)
        }

        next()
    }

    // Error handling.
    catch (error) {
        errorHandling(error, res)
    }
}
