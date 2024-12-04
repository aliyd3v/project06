const { Category } = require("../model/categoryModel")
const { Meal } = require("../model/mealModel")
const { errorHandling } = require("./errorController")

exports.createMeal = async (req, res) => {
    try {
        // Result validation.
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const errorMessage = errors.array().map(error => error.msg)
            return res.status(400).send({
                success: false,
                data: null,
                error: { message: errorMessage }
            })
        }
        const data = matchedData(req)

        // Checking name a meal to exists. (If mael exists with current name return error.)
        const condidat = await Meal.findOne({ name: data.name })
        if (condidat) {
            // Responsing.
            return res.status(400).send({
                success: false,
                data: null,
                error: { message: "Name a meal is already exists! Please enter another name." }
            })
        }

        // Checking category to valid and exists.
        const selectedCategory = await Category.findById(data.category)
        if (!selectedCategory) {
            // Responsing.
            return res.status(404).send({
                success: false,
                data: null,
                error: { message: "Selected category is not found!" }
            })
        }

        // Writing new meal to database.
        const newMeal = await Meal.create({
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category
        })

        // Responsing.
        return res.status(201).send({
            success: true,
            error: false,
            data: {
                message: "Meal has been created successful."
            }
        })
    } catch (error) {
        // Error handling.
        errorHandling(error, res)
    }
}

exports.getAllMeals = async (req, res) => {
    try {
        const meals = await Meal.find().populate('category', 'name')
        return res.status(200).send({
            success: true,
            error: false,
            data: {
                message: "Getting all meals is successful.",
                meals
            }
        })
    } catch (error) {
        errorHandling(error, res)
    }
}

exports.getOneMeal = async (req, res) => {
    const { params: { id } } = req
    try {
        // Checking id to valid.
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send({
                success: false,
                data: null,
                error: { message: "Url or Id is wrong!" }
            })
        }

        // Checking meal to exists.
        const meal = await Meal.findById(id).populate('category', 'name')
        if (!meal) {
            return res.status(404).send({
                success: false,
                data: null,
                error: { message: "Meal is not found!" }
            })
        }

        // Responsing.
        return res.status(200).send({
            success: true,
            error: false,
            data: {
                message: "Meal has been getted successful.",
                meal
            }
        })
    } catch (error) {
        errorHandling(error, res)
    }
}


exports.updateOneMeal = async (req, res) => {
    const { params: { id } } = req
    try {
        // Checking id to valid.
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send({
                success: false,
                data: null,
                error: { message: "Url or Id is wrong!" }
            })
        }

        const meal = await Meal.findById(id).populate('category', 'name')
        if (!meal) {
            return res.status(404).send({
                success: false,
                data: null,
                error: { message: "Meal is not found!" }
            })
        }

        // Result validation.
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const errorMessage = errors.array().map(error => error.msg)
            return res.status(400).send({
                success: false,
                data: null,
                error: { message: errorMessage }
            })
        }
        const data = matchedData(req)

        // Checking 
        if (meal.name == data.name || meal.category == data.category || meal.description == data.description || meal.price == data.price) {
            return res.status(200).send({
                success: true,
                error: false,
                data: {
                    message: "Meal has been updated successful."
                }
            })
        }
        if (meal.name != data.name) {
            const condidat = await Meal.findOne({ name: data.name })
            if (condidat) {
                // Responsing.
                return res.status(400).send({
                    success: false,
                    data: null,
                    error: { message: "Name a meal is already exists! Please enter another name." }
                })
            }
        }
        if (meal.category != data.category) {
            const selectedCategory = await Category.findById(data.category)
            if (!selectedCategory) {
                // Responsing.
                return res.status(404).send({
                    success: false,
                    data: null,
                    error: { message: "Selected category is not found!" }
                })
            }
        }

        // Writing changes to database.
        const updateMeal = await Meal.findByIdAndUpdate(id, {
            ...meal,
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category
        })

        return res.status(201).send({
            success: true,
            error: false,
            data: {
                message: "Meal has been updated successful.",
                updateMeal
            }
        })
    } catch (error) {
        errorHandling(error, res)
    }
}
exports.deleteOneMeal = async (req, res) => {
    const { params: { id } } = req
    try {
        // Checking id to valid.
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send({
                success: false,
                data: null,
                error: { message: "Url or Id is wrong!" }
            })
        }

        // Checking meal to exists.
        const meal = await Meal.findById(id)
        if (!meal) {
            return res.status(404).send({
                success: false,
                data: null,
                error: { message: "Meal is not found!" }
            })
        }

        // Deleting meal from database.
        await Meal.findByIdAndDelete(id)

        // Responsing.
        return res.status(201).send({
            success: true,
            error: false,
            data: {
                message: "Meal has been deleted successful."
            }
        })
    } catch (error) {
        // Error handling.
        errorHandling(error, res)
    }
}