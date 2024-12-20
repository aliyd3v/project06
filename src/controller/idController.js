const fs = require('fs')

exports.idChecking = (req, res, id) => {
    if (!id.match(/^[0-9a-fA-F]{24}$/) || id == undefined) {
        if (req.file) {
            fs.unlinkSync(req.file.path)
        }

        // Responsing.
        return res.status(400).send({
            success: false,
            data: null,
            error: { message: "Url or Id is wrong!" }
        })
    }
}