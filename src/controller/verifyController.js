const { errorHandling } = require("./errorController")

exports.verifyUrl = async (req, res) => {
    try {

    } catch (error) {
        errorHandling(error, res)
    }
}