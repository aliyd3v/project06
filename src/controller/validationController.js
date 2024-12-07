const { matchedData, validationResult } = require("express-validator")

exports.validationController = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const errorMessage = errors.array().map(error => error.msg)
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