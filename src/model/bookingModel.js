const { Schema, model } = require("mongoose");

const bookingSchema = new Schema({
    customer_name: String,
    email: String,
    phone: String,
    Date: Date,
    status: {
        type: String,
        enum: ['Active', 'History'],
    },
    stol: { type: Schema.Types.ObjectId, ref: 'Stol' }
}, { timestamps: true })

exports.Booking = model('Booking', bookingSchema)