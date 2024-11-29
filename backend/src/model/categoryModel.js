const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
    en_name: String,
    ru_name: String,
    image: String,
    meals: [{
        type: Schema.Types.ObjectId,
        ref: 'Meal'
    }]
})

exports.Category = model('Category', categorySchema)