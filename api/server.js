const express = require('express')
const router = require('./src/route/route')
const app = express()
const cookieParser = require('cookie-parser')
const { cookieParserKey } = require('./src/config/config')
const { connectMongodb } = require('./src/db/mongodb')

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(cookieParser(cookieParserKey))
app.use('/', router)

connectMongodb()

app.listen(5050, () => {
    console.log('Server running on port 5050...')
})