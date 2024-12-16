const express = require('express')
const router = require('./src/route/route')
const app = express()
const cookieParser = require('cookie-parser')
const { connectMongodb } = require('./src/db/mongodb')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const { port } = require('./src/config/config')

// Connencting to MongoDB
connectMongodb()

// Body parsing & handling.
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({
    extended: false
}))

// Routes.
app.use('/', router)

// Register port and run server.
app.listen(port, () => {
    console.log(`Server running on port ${port}...`)
})