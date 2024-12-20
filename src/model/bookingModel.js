const { Schema, model } = require("mongoose");

const bookingSchema = new Schema({
    customer_name: String,
    email: String,
    phone: String,
    date: Date,
    is_active: Boolean,
    stol: { type: Schema.Types.ObjectId, ref: 'Stol' }
}, { timestamps: true })

exports.Booking = model('Booking', bookingSchema)