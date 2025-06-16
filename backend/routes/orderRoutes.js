const express = require('express');
const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const router = express.Router();

// POST /api/order/place
// 
// Make necessary changes in cart and click Place order button
router.post('/placeorder', async (req, res) => {
    const { userid, address } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(userid)) {
      return res.status(400).json({ error: 'Invalid userid' });
    }
  
    if (!address) {
      return res.status(400).json({ error: 'Address is required' });
    }
  
    try {
      // Get cart items and populate product data
      const cartItems = await Cart.find({ userid }).populate('productid');

      
  
      if (cartItems.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
      }
  
      let totalAmount = 0;
      const products = [];
  
      for (const item of cartItems) {
        const product = item.productid;
        const price = product.price;
        const quantity = item.quantity;
        const itemTotal = price * quantity;
  
        totalAmount += itemTotal;
  
        products.push({
          productid: product._id,
          productname: product.productname,
          quantity,
          price,
          itemTotal,
          status: 'Pending'
        });
      }

  
      // Create the order
      const newOrder = new Order({
        userid,
        products,
        totalAmount,
        address,
        status: 'Pending',
        paymentStatus: 'Unpaid'
      });
  
      await newOrder.save();
  
      // Clear the cart
    //   await Cart.deleteMany({ userid });
  
      return res.status(201).json({
        message: 'Order placed successfully',
        order: newOrder
      });
  
    } catch (err) {
      console.error('Order creation failed:', err);
      return res.status(500).json({ error: 'Server error' });
    }
  });


router.get('/getorders/:userid', async (req, res) => {
  const { userid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userid)) {
    return res.status(400).json({ error: 'Invalid userid' });
  }

  try {
    const orders = await Order.find({ userid }).populate('products.productid');

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    return res.status(200).json({ orders });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});



//Update order product status
router.put('/updateorderstatus/:orderId/:productId', async (req, res) => {
    const { orderId, productId } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(orderId) || !mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ error: 'Invalid orderId or productId' });
    }

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const product = order.products.find(p => p.productid.toString() === productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found in order' });
        }

        product.status = status;

        await order.save();

        return res.status(200).json({ message: 'Product status updated successfully', order });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});



// Update order status
router.put('/updateorderstatus/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({ error: 'Invalid orderId' });
    }

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        order.status = status;
        await order.save();
        return res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
}
);




module.exports = router;
