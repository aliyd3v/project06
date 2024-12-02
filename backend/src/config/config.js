const config = require('dotenv').config()

// JWT config.
exports.jwtSecretKey = process.env.JWT_SECRET_KEY

// CookieParser config.
exports.cookieParserKey = process.env.COOKIE_PARSER_KEY

// MongoDB config.
exports.mongodbUrl = process.env.MONGODB_URL

// Supabase config.
exports.supabaseUrl = process.env.SUPABASE_URL
exports.supabaseKey = process.env.SUPABASE_KEY

// Email for nodemailer.
exports.MyTestEmail = process.env.MY_EMAIL
exports.MyTestEmailPassword = process.env.MY_EMAIL_PASSWORD