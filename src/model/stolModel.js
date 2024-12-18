const { Schema, model } = require("mongoose");

const stolSchema = new Schema({
    number: Number,
    price: Number,
    status: {
        type: String,
        enum: ['Booked', 'Open'],
    }
}, { timestamps: true })

exports.Stol = model('Stol', stolSchema)