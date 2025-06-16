const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  products: [
    {
      productid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      price: {
        type: Number,
        required: true
      },
      itemTotal: {
        type: Number,
        required: true
      },
      status: {
        type: String,
        enum: ['Pending', 'Packed', 'Shipped', 'Delivered'],
        default: 'Pending'
      }
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Pending'
  },

  paymentStatus: {
    type: String,
    enum: ['Unpaid', 'Paid'],
    default: 'Unpaid'
  },

  address: {
    type: String,
    required: true
  },

  orderedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
