const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
    customer_name: String,
    email: String,
    phone: String,
    status: {
        type: String,
        enum: ['Delivered', 'Pending'],
    },
    meals: [{
        mealId: {
            type: Schema.Types.ObjectId,
            ref: 'Meal'
        },
        amount: Number
    }]
}, { timestamps: true })

exports.Order = model('Order', orderSchema)