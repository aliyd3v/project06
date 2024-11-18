const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
    name: String,
    meals: [{
        type: Schema.Types.ObjectId,
        ref: 'Meal'
    }]
})

exports.Category = model('Category', categorySchema)