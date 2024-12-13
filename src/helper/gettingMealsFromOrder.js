const { Meal } = require("../model/mealModel")

exports.gettingMealsFromOrder = async (array) => {
    const mealPromises = array.map(object => Meal.findById(object.mealId))
    const meals = await Promise.all(mealPromises);
    return meals
}