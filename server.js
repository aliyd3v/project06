const express = require('express')
const router = require('./src/route/route')
const app = express()
const cookieParser = require('cookie-parser')
const { cookieParserKey } = require('./src/config/config')
const { connectMongodb } = require('./src/db/mongodb')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')

app.use((req, res, next) => {
    res.setHeader('Referrer-Policy', 'strict-origin');
    next()
});
app.use(cors())
app.use(helmet());
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(cookieParser(cookieParserKey))
app.use('/', router)

connectMongodb()

app.listen(5050, () => {
    console.log('Server running on port 5050...')
})