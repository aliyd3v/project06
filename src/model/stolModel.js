const { Schema, model } = require("mongoose");

const stolSchema = new Schema({
    number: Number,
    price: Number
}, { timestamps: true })

exports.Stol = model('Stol', stolSchema)