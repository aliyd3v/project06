const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
    email: String,
    phone: String,
    status: {
        type: String,
        enum: ['Delivered', 'Pending', 'Canceled', 'Checking', ],
        default: 'pending',
        required: [true, 'Status required!']
    },
    meals: [{
        type: Schema.Types.ObjectId,
        ref: 'Meal'
    }]
}, { timestamps: true })

exports.Order = model('Order', orderSchema)