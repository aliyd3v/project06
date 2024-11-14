exports.errorHandling = (error, res) => {
    console.log(error)
    if (error.message) {
        return res.status(400).send({
            success: false,
            data: null,
            error: { message: error.message }
        })
    }
    return res.status(500).send({
        success: false,
        data: null,
        error: { message: "INTERNAL_SERVER_ERROR!" }
    })
}