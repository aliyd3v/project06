const { checkSchema } = require('express-validator')
const { adminCreate, getAllAdmins } = require('../controller/adminController')
const { login } = require('../controller/authController')
const { createCategory, getAllCategories, getOneCategory, updateOneCategory, deleteOneCategory, deleteAllCategories } = require('../controller/categoryController')
const { createMeal, getAllMeals, getOneMeal, updateOneMeal, deleteOneMeal } = require('../controller/mealController')
const { jwtAccessMiddleware } = require('../middleware/jwtAccessMiddleware')
const { categoryCreateValidationSchema } = require('../validationSchemas/categoryCreateValidationSchema')
const { categoryUpdateValidationSchema } = require('../validationSchemas/categoryUpdateValidationSchema')
const { createAdminValidationSchema } = require('../validationSchemas/adminCreateValidationSchema')
const { loginValidationSchema } = require('../validationSchemas/loginValidationSchema')
const { mealCreateValidationSchema } = require('../validationSchemas/mealCreateValidationSchema')
const { mealUpdateValidationSchema } = require('../validationSchemas/mealUpdateValidationSchema')
const { upload } = require('../helper/upload')
const { orderCreateValidationSchema } = require('../validationSchemas/orderCreateValidationSchema')
const { getAllActualOrders, createOrderWithVerification, verifyTokenAndCreateOrder, getOneOrder, markAsDelivered } = require('../controller/orderController')
const { getAllHistory } = require('../controller/historyController')
const { directNotFound } = require('../controller/directNotFoundMessage')

const router = require('express').Router()

router
    // Auth route.
    .post('/login', checkSchema(loginValidationSchema), login)

    // Admin route.
    .post('/admin-create', jwtAccessMiddleware, checkSchema(createAdminValidationSchema), adminCreate)
    .get('/admins', jwtAccessMiddleware, getAllAdmins)

    // Category route.
    .post('/category/create', jwtAccessMiddleware, upload.single('file'), checkSchema(categoryCreateValidationSchema), createCategory)
    .get('/category', getAllCategories)
    .get('/category/:id', getOneCategory)
    .post('/category/:id/update', jwtAccessMiddleware, upload.single('file'), checkSchema(categoryUpdateValidationSchema), updateOneCategory)
    .post('/category/:id/delete', jwtAccessMiddleware, deleteOneCategory)
    .post('/categories/delete', jwtAccessMiddleware, deleteAllCategories)

    // Meal route.
    .post('/meal/create', jwtAccessMiddleware, upload.single('file'), checkSchema(mealCreateValidationSchema), createMeal)
    .get('/meal', getAllMeals)
    .get('/meal/:id', getOneMeal)
    .post('/meal/:id/update', jwtAccessMiddleware, checkSchema(mealUpdateValidationSchema), updateOneMeal)
    .post('/meal/:id/delete', jwtAccessMiddleware, deleteOneMeal)

    // Order route.
    .post('/order/create', checkSchema(orderCreateValidationSchema), createOrderWithVerification)
    .get('/order', jwtAccessMiddleware, getAllActualOrders)
    .get('/verify/:id', verifyTokenAndCreateOrder)
    .get('/order/:id', jwtAccessMiddleware, getOneOrder)
    .post('/order/:id/delivered', markAsDelivered)

    // History route.
    .get('/history', jwtAccessMiddleware, getAllHistory)

    // Direct not found message.
    .use(directNotFound)

module.exports = router