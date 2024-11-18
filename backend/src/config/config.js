const config = require('dotenv').config()

exports.jwtSecretKey = process.env.JWT_SECRET_KEY
exports.cookieParserKey = process.env.COOKIE_PARSER_KEY
exports.mongodbUrl = process.env.MONGODB_URL