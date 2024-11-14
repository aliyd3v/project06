const { adminCreate, getAllAdmins } = require('../controller/adminController')
const { login } = require('../controller/loginController')
const { jwtAccessMiddleware } = require('../middleware/jwtAccessMiddleware')

const router = require('express').Router()

router
    .post('/login', login)
    .post('/admin-create', jwtAccessMiddleware, adminCreate)
    .get('/admins', jwtAccessMiddleware, getAllAdmins)

module.exports = router