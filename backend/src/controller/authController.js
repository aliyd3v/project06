const jwt = require('jsonwebtoken')
const { errorHandling } = require("./errorController")
const { jwtSecretKey } = require('../config/config')
const { Admin } = require('../model/userModel')
const { validationResult, matchedData } = require('express-validator')

function tokenGenerate(id) {
    const payload = {
        id
    }
    return jwt.sign(payload, jwtSecretKey)
}

exports.login = async (req, res) => {
    try {
        // Clear cookie.
        res.clearCookie('authcookie')

        // Result validation.
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log(errors)
            const errorMessage = errors.array().map(error => error.msg)
            return res.status(400).send({
                success: false,
                data: null,
                error: { message: errorMessage }
            })
        }
        const data = matchedData(req)

        // Checking user and password to valid.
        const user = await Admin.findOne({ username: data.username })
        if (!user) {
            return res.status(403).send({
                success: false,
                data: null,
                error: { message: `Admin not found with username ${data.username}.` }
            })
        }
        if (user.password !== data.password) {
            return res.status(403).send({
                success: false,
                data: null,
                error: { message: `Password is wrong!` }
            })
        }

        // Writing cookie.
        const token = tokenGenerate(user._id)
        res.cookie('authcookie', token)

        // Responsing.
        return res.status(201).send({
            success: true,
            error: false,
            data: {
                message: "Login success."
            }
        })
    } catch (error) {
        // Error handling.
        errorHandling(error, res)
    }
}

exports.logout = async (req, res) => {
    try {
        // Clear cookie.
        res.clearCookie('authcookie')

        // Responsning.
        return res.status(201).send({
            success: true,
            error: false,
            data: { message: "Logout has been successful!" }
        })
    } catch (error) {
        // Error handling.
        errorHandling(error, res)
    }
}