const { checkSchema } = require('express-validator')
const { adminCreate, getAllAdmins } = require('../controller/adminController')
const { login } = require('../controller/authController')
const { createCategory, getAllCategories, getOneCategory, updateOneCategory, deleteOneCategory, deleteAllCategories, getCategoryMeals } = require('../controller/categoryController')
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
const { getAllActualOrders, createOrderWithVerification, getOneOrder, markAsDelivered } = require('../controller/orderController')
const { getAllHistory } = require('../controller/historyController')
const { directNotFound } = require('../controller/directNotFoundMessage')
const { stolCreateValidationSchema } = require('../validationSchemas/stolCreateValidationSchema')
const { createStol, getAllStols, getOneStol, updateOneStol, deleteOneStol, createManyStols, deleteManyStols } = require('../controller/stolController')
const { stolUpdateValidationSchema } = require('../validationSchemas/stolUpdateValidationSchema')
const { createBookingWithVerification, getAllActiveBooking, getOneBooking } = require('../controller/bookingController')
const { bookingCreateValidationSchema } = require('../validationSchemas/bookingCreateValidationSchema')
const { verifyTokenAndCreateOrderOrBooking } = require('../controller/verifyContorller')

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
    .get('/category/:id/meals', getCategoryMeals)
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
    .get('/order/:id', jwtAccessMiddleware, getOneOrder)
    .post('/order/:id/delivered', markAsDelivered)

    // Stol route.
    .post('/stol/create', jwtAccessMiddleware, checkSchema(stolCreateValidationSchema), createStol)
    .get('/stol', jwtAccessMiddleware, getAllStols)
    .get('/stol/:id', jwtAccessMiddleware, getOneStol)
    .post('/stol/:id/update', jwtAccessMiddleware, checkSchema(stolUpdateValidationSchema), updateOneStol)
    .post('/stol/:id/delete', jwtAccessMiddleware, deleteOneStol)

    // For testing.
    .post('/stol/create-many', jwtAccessMiddleware, createManyStols)
    .post('/stol/delete-many', jwtAccessMiddleware, deleteManyStols)

    // Booking route.
    .post('/booking/create', checkSchema(bookingCreateValidationSchema), createBookingWithVerification)
    .get('/booking', jwtAccessMiddleware, getAllActiveBooking)
    .get('/booking/:id', jwtAccessMiddleware, getOneBooking)

    // Verify token route.
    .get('/verify/:id', verifyTokenAndCreateOrderOrBooking)

    // History route.
    .get('/history', jwtAccessMiddleware, getAllHistory)

    // Direct not found message.
    .use(directNotFound)

module.exports = router