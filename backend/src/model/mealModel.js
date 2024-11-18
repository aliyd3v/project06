const { Schema, model } = require("mongoose");

const mealSchema = new Schema({
    name: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    description: String,
    price: Number
})

exports.Meal = model('Meal', mealSchema)