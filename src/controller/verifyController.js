const { errorHandling } = require("./errorController")

exports.verifyUrl = async (req, res) => {
    const { query } = req
    try {
        if (!query.token) {
            return res.status(400).send({
                success: false,
                data: null,
                error: { message: "Token not valid!" }
            })
        }

    } 
    
    // Error handling.
    catch (error) {
        errorHandling(error, res)
    }
}