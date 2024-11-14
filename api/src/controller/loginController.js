const jwt = require('jsonwebtoken')
const { errorHandling } = require("./errorController")
const { jwtSecretKey } = require('../config/config')
const { Admin } = require('../model/userModel')

function tokenGenerate(id) {
    const payload = {
        id
    }
    return jwt.sign(payload, jwtSecretKey)
}

exports.login = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await Admin.findOne({ username: username })
        if (!user) {
            return res.status(403).send({
                success: false,
                data: null,
                error: { message: `Admin not found with username ${username}.` }
            })
        }
        if (user.password !== password) {
            return res.status(403).send({
                success: false,
                data: null,
                error: { message: `Password is wrong!` }
            })
        }
        const token = tokenGenerate(user._id)
        res.cookie('authcookie', token)
        return res.status(201).send({
            success: true,
            error: false,
            data: {
                message: "Login success.",
                token
            }
        })
    } catch (error) {
        errorHandling(error, res)
    }
}