const { matchedData, validationResult } = require("express-validator")
const fs = require('fs')

exports.validationController = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const errorMessage = errors.array().map(error => error.msg)

        if (req.file) {
            fs.unlinkSync(req.file.path)
        }

        // Responsing.
        return res.status(400).send({
            success: false,
            data: null,
            error: { message: errorMessage }
        })
    }

    // Returning validated data.
    return matchedData(req)
}