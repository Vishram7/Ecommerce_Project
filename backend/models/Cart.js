const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
        // min: 1
    }
}, { timestamps: true });

// Adding a unique index on (userid, productid) to ensure no duplicates for a user-product pair
cartSchema.index({ userid: 1, productid: 1 }, { unique: true });

module.exports = mongoose.model('Cart', cartSchema);
