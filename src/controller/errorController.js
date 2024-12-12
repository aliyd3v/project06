exports.errorHandling = (error, res) => {
    console.log(error)
    // Responsing.
    return res.status(500).send({
        success: false,
        data: null,
        error: { message: "INTERNAL_SERVER_ERROR!" }
    })
}