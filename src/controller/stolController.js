const { status } = require("express/lib/response")
const { Stol } = require("../model/stolModel")
const { errorHandling } = require("./errorController")

exports.createStol = async (req, res) => {
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

        // Checking stol-number for exists.
        const condidat = await Stol.findOne({ number: data.number })
        if (condidat) {
            // Responsing.
            return res.status(400).send({
                success: false,
                data: null,
                error: {
                    message: `Already exists stol with number - ${data.number}. Please enter another number!`
                }
            })
        }

        // Writing to database.
        await Stol.create({
            number: data.number,
            price: data.price,
            status: "Open"
        })

        // Responsing.
        return res.status(201).send({
            success: true,
            error: false,
            data: {
                message: "Stol has been created successfully."
            }
        })
    }

    // Error handling.
    catch (error) {
        errorHandling(error, res)
    }
}

exports.getAllStols = async (req, res) => {
    try {
        // Getting all stols from database.
        const stols = await Stol.find()

        // Responsing.
        return res.status(200).send({
            success: true,
            error: false,
            data: {
                message: "Stols getted successfully.",
                stols
            }
        })
    }

    // Error handling.
    catch (error) {
        errorHandling(error, res)
    }
}

exports.getOneStol = async (req, res) => {
    const { params: { id } } = req
    try {
        // Checking id to valid.
        idChecking(req, res, id)

        // Geting a stol from database via id.
        const stol = await Stol.findById(id)

        // Checking stol for exists.
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

        // Responsing.
        return res.status(200).send({
            success: true,
            error: false,
            data: {
                message: "Stol getted successfully.",
                stol
            }
        })
    }

    // Error handling.
    catch (error) {
        errorHandling(error, res)
    }
}

exports.updateOneStol = async (req, res) => {
    const { params: { id } } = req
    try {
        // Checking id to valid.
        idChecking(req, res, id)

        // Geting a stol from database via id.
        const stol = await Stol.findById(id)

        // Checking stol for exists.
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

        // Checking for changing data.
        if (stol.number == data.number && stol.price == data.price && stol.status == data.status) {
            // Responsing.
            return res.status(201).send({
                success: true,
                error: false,
                data: {
                    message: "Stol has been updated successfully."
                }
            })
        }

        // Writing updates to database.
        stol.number = data.number
        stol.price = data.price
        stol.status = data.status
        await Stol.findByIdAndUpdate(id, stol)

        // Responsing.
        return res.status(201).send({
            success: true,
            error: false,
            data: {
                message: "Stol has been updated successfully."
            }
        })
    }

    // Error handling.
    catch (error) {
        errorHandling(error, res)
    }
}

exports.deleteOneStol = async (req, res) => {
    const { params: { id } } = req
    try {
        // Checking id to valid.
        idChecking(req, res, id)

        // Geting a stol from database via id.
        const stol = await Stol.findById(id)

        // Checking stol for exists.
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

        // Deleting stol from database.
        await Stol.findByIdAndDelete(id)
        
        // Responsing.
        return res.status(201).send({
            success: true,
            error: false,
            data: {
                message: "Stol has been deleted successfully."
            }
        })
    }

    // Error handling.
    catch (error) {
        errorHandling(error, res)
    }
}