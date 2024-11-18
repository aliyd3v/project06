const { checkSchema } = require('express-validator')
const { adminCreate, getAllAdmins } = require('../controller/adminController')
const { login, logout } = require('../controller/authController')
const { createCategory, getAllCategories, getOneCategory, updateOneCategory, deleteOneCategory } = require('../controller/categoryController')
const { createMeal, getAllMeals, getOneMeal, updateOneMeal, deleteOneMeal } = require('../controller/mealController')
const { jwtAccessMiddleware } = require('../middleware/jwtAccessMiddleware')
const { categoryCreateValidationSchema } = require('../validationSchemas/categoryCreateValidationSchema')
const { categoryUpdateValidationSchema } = require('../validationSchemas/categoryUpdateValidationSchema')
const { createAdminValidationSchema } = require('../validationSchemas/adminCreateValidationSchema')
const { loginValidationSchema } = require('../validationSchemas/loginValidationSchema')
const { mealCreateValidationSchema } = require('../validationSchemas/mealCreateValidationSchema')
const { mealUpdateValidationSchema } = require('../validationSchemas/mealUpdateValidationSchema')

const router = require('express').Router()

router
    // Auth route.
    .post('/login', checkSchema(loginValidationSchema), login)
    .get('/logout', logout)

    // Admin route.
    .post('/admin-create', jwtAccessMiddleware, checkSchema(createAdminValidationSchema), adminCreate)
    .get('/admins', jwtAccessMiddleware, getAllAdmins)

    // Category route.
    .post('/category/create', jwtAccessMiddleware, checkSchema(categoryCreateValidationSchema), createCategory)
    .get('/category', jwtAccessMiddleware, getAllCategories)
    .get('/category/:id', jwtAccessMiddleware, getOneCategory)
    .post('/category/:id/update', jwtAccessMiddleware, checkSchema(categoryUpdateValidationSchema), updateOneCategory)
    .post('/category/:id/delete', jwtAccessMiddleware, deleteOneCategory)

    // Meal route.
    .post('/meal/create', jwtAccessMiddleware, checkSchema(mealCreateValidationSchema), createMeal)
    .post('/meal', jwtAccessMiddleware, getAllMeals)
    .post('/meal/:id', jwtAccessMiddleware, getOneMeal)
    .post('/meal/:id/update', jwtAccessMiddleware, checkSchema(mealUpdateValidationSchema), updateOneMeal)
    .post('/meal/:id/delete', jwtAccessMiddleware, deleteOneMeal)

module.exports = router