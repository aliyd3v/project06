exports.directNotFound = (req, res) => {
    // Responsing.
    return res.status(404).send({
        success: false,
        data: null,
        error: { message: "Direct is not found!" }
    })
}