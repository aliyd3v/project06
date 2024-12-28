const { checkSchema } = require('express-validator')
const { adminCreate, getAllAdmins } = require('../controller/adminController')
const { login } = require('../controller/authController')
const { createCategory, getAllCategories, getOneCategory, updateOneCategory, deleteOneCategory, deleteAllCategories, getCategoryMeals, searchingCategory } = require('../controller/categoryController')
const { createMeal, getAllMeals, getOneMeal, updateOneMeal, deleteOneMeal, searchingMeals, deleteManyMeals } = require('../controller/mealController')
const { jwtAccessMiddleware } = require('../middleware/jwtAccessMiddleware')
const { categoryCreateValidationSchema } = require('../validationSchemas/categoryCreateValidationSchema')
const { categoryUpdateValidationSchema } = require('../validationSchemas/categoryUpdateValidationSchema')
const { createAdminValidationSchema } = require('../validationSchemas/adminCreateValidationSchema')
const { loginValidationSchema } = require('../validationSchemas/loginValidationSchema')
const { mealCreateValidationSchema } = require('../validationSchemas/mealCreateValidationSchema')
const { mealUpdateValidationSchema } = require('../validationSchemas/mealUpdateValidationSchema')
const { upload } = require('../helper/upload')
const { orderCreateValidationSchema } = require('../validationSchemas/orderCreateValidationSchema')
const { getAllActualOrders, createOrderWithVerification, getOneOrder, markAsDelivered, deleteAllOrders } = require('../controller/orderController')
const { getAllHistory, deleteAllHistory } = require('../controller/historyController')
const { directNotFound } = require('../controller/directNotFoundMessage')
const { stolCreateValidationSchema } = require('../validationSchemas/stolCreateValidationSchema')
const { createStol, getAllStols, getOneStol, updateOneStol, deleteOneStol, createManyStols, deleteManyStols } = require('../controller/stolController')
const { stolUpdateValidationSchema } = require('../validationSchemas/stolUpdateValidationSchema')
const { createBookingWithVerification, getAllActiveBooking, getOneBooking, deleteAllBookings, deactivateBooking, getAllBooking, checkBookingForAvailability } = require('../controller/bookingController')
const { bookingCreateValidationSchema } = require('../validationSchemas/bookingCreateValidationSchema')
const { verifyTokenAndCreateOrderOrBooking, createVerifyForGetAllBookingAndOrder } = require('../controller/verifyContorller')
const { createVerifyTokenForGetAllBookingsOrdersValidationSchema } = require('../validationSchemas/createVerifyTokenForGetAllBookingsOrdersValidationSchema')
const { getAllCustomersAllTime, searchCustomer, getOneCustomer } = require('../controller/customerContoller')
const { searchCustomerValidatorSchema } = require('../validationSchemas/searchCustomerValidatorSchema')
const { getOneCustomerValidationSchema } = require('../validationSchemas/getOneCustomerValidationSchema')
const { searchMealsValidatorSchema } = require('../validationSchemas/searchMealsValidationSchema')
const { searchMCategoriesValidatorSchema } = require('../validationSchemas/searchCategoriesValidationSchema')

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
    .get('/category/search', checkSchema(searchMCategoriesValidatorSchema), searchingCategory)


    // Meal route.
    .post('/meal/create', jwtAccessMiddleware, upload.single('file'), checkSchema(mealCreateValidationSchema), createMeal)
    .get('/meal', getAllMeals)
    .get('/meal/:id', getOneMeal)
    .post('/meal/:id/update', jwtAccessMiddleware, checkSchema(mealUpdateValidationSchema), updateOneMeal)
    .post('/meal/:id/delete', jwtAccessMiddleware, deleteOneMeal)
    .get('/meal/search', checkSchema(searchMealsValidatorSchema), searchingMeals)


    // Order route.
    .post('/order/create', checkSchema(orderCreateValidationSchema), createOrderWithVerification)
    .get('/order', jwtAccessMiddleware, getAllActualOrders)
    .get('/order/:id', jwtAccessMiddleware, getOneOrder)
    .post('/order/:id/delivered', markAsDelivered)


    // Stol route.
    .post('/stol/create', jwtAccessMiddleware, checkSchema(stolCreateValidationSchema), createStol)
    .get('/stol', getAllStols)
    .get('/stol/:id', jwtAccessMiddleware, getOneStol)
    .post('/stol/:id/update', jwtAccessMiddleware, checkSchema(stolUpdateValidationSchema), updateOneStol)
    .post('/stol/:id/delete', jwtAccessMiddleware, deleteOneStol)


    // Booking route.
    .post('/booking/create', checkSchema(bookingCreateValidationSchema), createBookingWithVerification)
    .get('/booking', jwtAccessMiddleware, getAllBooking)
    .get('/booking/active', jwtAccessMiddleware, getAllActiveBooking)
    .get('/booking/availability', checkBookingForAvailability)
    .get('/booking/:id', jwtAccessMiddleware, getOneBooking)
    .post('/booking/:id/deactivate', deactivateBooking)


    // Getting all bookings and orders for customer.
    .post('/customer-cabinet/create-verify', checkSchema(createVerifyTokenForGetAllBookingsOrdersValidationSchema), createVerifyForGetAllBookingAndOrder)
    // .get('/customer-cabinet/:id')


    // Getting customer-cabinet for admin.
    .get('/customer', jwtAccessMiddleware, getAllCustomersAllTime)
    .get('/customer/get-one', jwtAccessMiddleware, checkSchema(getOneCustomerValidationSchema), getOneCustomer)
    .get('/customer/search', jwtAccessMiddleware, checkSchema(searchCustomerValidatorSchema), searchCustomer)


    // Verify token route.
    .get('/verify/:id', verifyTokenAndCreateOrderOrBooking)


    // History route.
    .get('/history', jwtAccessMiddleware, getAllHistory)
    .post('/history/delete-all', jwtAccessMiddleware, deleteAllHistory)


    // Direct not found message.
    .use(directNotFound)


    // For testing.
    .post('/categories/delete-all', jwtAccessMiddleware, deleteAllCategories)
    .post('/booking/delete-all', jwtAccessMiddleware, deleteAllBookings)
    .post('/order/delete-all', jwtAccessMiddleware, deleteAllOrders)
    .post('/stol/create-many', jwtAccessMiddleware, createManyStols)
    .post('/stol/delete-all', jwtAccessMiddleware, deleteManyStols)
    .post('/meal/delete-all', jwtAccessMiddleware, deleteManyMeals)


module.exports = router