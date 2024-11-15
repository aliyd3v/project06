const { jwtSecretKey } = require("../config/config")
const { errorHandling } = require("../controller/errorController")
const jwt = require("jsonwebtoken")
const { Admin } = require("../model/userModel")

exports.jwtAccessMiddleware = async function (req, res, next) {
    try {
        if (!req.cookies) {
            return res.status(403).send({
                success: false,
                data: null,
                error: { message: "Access denied. Token is valid!" }
            })
        }
        const token = req.cookies.authcookie
        if (!token) {
            return res.status(403).send({
                success: false,
                data: null,
                error: { message: "Access denied. Token is valid!" }
            })
        }
        const { id } = jwt.verify(token, jwtSecretKey, function (error, decoded) {
            if (error) {
                return res.status(403).send({
                    success: false,
                    data: null,
                    error: { message: "Access denied. Token is valid!" }
                })
            }
            return decoded
        })
        // Checking id to valid.
        if (!id) {
            return res.status(403).send({
                success: false,
                data: null,
                error: { message: "Access denied. Token is valid!" }
            })
        }
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(403).send({
                success: false,
                data: null,
                error: { message: "Access denied. Token is valid!" }
            })
        }
        const admin = await Admin.findById(id)
        if (!admin) {
            return res.status(403).send({
                success: false,
                data: null,
                error: { message: "Access denied. Token is valid!" }
            })
        }
        next()
    } catch (error) {
        errorHandling(error, res)
    }
}