const jwt = require('jsonwebtoken')
const { errorHandling } = require("./errorController")
const { jwtSecretKey, projectStatus } = require('../config/config')
const { Admin } = require('../model/userModel')
const { validationResult, matchedData } = require('express-validator')
const { validationController } = require('./validationController')

const tokenGenerate = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, jwtSecretKey)
}

exports.login = async (req, res) => {
    try {
        // Result validation.
        const { data, error } = validationController(req, res)
        if (error) {
            return res.status(400).send({
                success: false,
                data: null,
                error: {
                    message: error
                }
            })
        }

        // Checking user and password to valid.
        const user = await Admin.findOne({ username: data.username })
        if (!user) {
            // Responsing.
            return res.status(403).send({
                success: false,
                data: null,
                error: { message: `Admin not found with username "${data.username}".` }
            })
        }
        if (user.password !== data.password) {
            // Responsing.
            return res.status(403).send({
                success: false,
                data: null,
                error: { message: `Password is wrong!` }
            })
        }

        // Generating token.
        const token = tokenGenerate(user._id)

        // Responsing.
        return res.status(201).send({
            success: true,
            error: false,
            data: {
                message: "Login success.",
                token
            }
        })
    }

    // Error handling.
    catch (error) {
        errorHandling(error, res)
    }
}