const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
    customer_name: String,
    email: String,
    phone: String,
    status: {
        type: String,
        enum: ['Delivered', 'Pending' ],
        required: [true, 'Status required!']
    },
    meals: [{
        type: Schema.Types.ObjectId,
        ref: 'Meal'
    }]
}, { timestamps: true })

exports.Order = model('Order', orderSchema)