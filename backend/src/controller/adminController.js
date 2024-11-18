const { Admin } = require("../model/userModel")
const { errorHandling } = require("./errorController")

exports.adminCreate = async (req, res) => {
    const { username, password } = req.body
    try {
        // Checking username and password to exists.
        if (!username) {
            return res.status(400).send({
                success: false,
                data: null,
                error: { message: `Username cannot be empty! Please enter a username.` }
            })
        }
        if (!password) {
            return res.status(400).send({
                success: false,
                data: null,
                error: { message: `Password cannot be empty! Please enter a password.` }
            })
        }
        const admin = await Admin.create({ username: username, password: password })
        return res.status(201).send({
            success: true,
            error: false,
            data: {
                message: `Admin has been created successful.`,
                amdin: { username: username }
            }
        })
    } catch (error) {
        errorHandling(error, res)
    }
}

exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find()
        return res.status(201).send({
            success: true,
            error: false,
            data: { admins }
        })
    } catch (error) {
        errorHandling(error, res)
    }
}

