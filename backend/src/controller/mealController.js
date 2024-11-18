const { Meal } = require("../model/mealModel")
const { errorHandling } = require("./errorController")

exports.createMeal = async (req, res) => {
    const { body } = req
    try {
        const newMeal = await Meal.create({
            name: body.name,
            category: body.categoryId
        })
        return res.status(201).send({
            success: true,
            error: false,
            data: {
                message: "Meal has been created successful.",
                meal: { name: `${body.name}` }
            }
        })
    } catch (error) {
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
    const { body, params: { id } } = req
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

        if (!body.name || !body.category) {
            return res.status(400).send({
                success: false,
                data: null,
                error: { message: "Meal mame and category is required!" }
            })
        }

        if (meal.name == body.name || meal.category == body.category) {
            return res.status(200).send({
                success: true,
                error: false,
                data: {
                    message: "Meal has been getted successful.",
                    category
                }
            })
        }

        const updateMeal = await Meal.findByIdAndUpdate(id, {
            ...meal,
            name: body.name,
            category: body.category
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

        return res.status(201).send({
            success: true,
            error: false,
            data: {
                message: "Meal has been deleted successful."
            }
        })
    } catch (error) {
        errorHandling(error, res)
    }
}