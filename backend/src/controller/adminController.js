const { Admin } = require("../model/userModel")
const { errorHandling } = require("./errorController")

exports.adminCreate = async (req, res) => {
    try {
        // Result validation.
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const errorMessage = errors.array().map(error => error.msg)
            return res.status(400).send({
                success: false,
                data: null,
                error: { message: errorMessage }
            })
        }
        const data = matchedData(req)

        // Writing new admin to database.
        const admin = await Admin.create({ username: data.username, password: data.password })

        // Responsing.
        return res.status(201).send({
            success: true,
            error: false,
            data: {
                message: `Admin ${data.username} has been created successful.`
            }
        })
    } catch (error) {
        // Error handling.
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
        // Error handling.
        errorHandling(error, res)
    }
}

