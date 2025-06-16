const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart')
const mongoose = require('mongoose')




// Add a product to the cart
router.post('/addtocart', async (req, res) => {
    const { userid, products } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userid)) {
        return res.status(400).json({ error: 'Invalid userid' });
    }

    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: 'Products array is required' });
    }

    try {
        for (const item of products) {
            const { productid, quantity } = item;
            const qty = parseInt(quantity);

            if (!mongoose.Types.ObjectId.isValid(productid) || isNaN(qty) || qty < 0) {
                return res.status(400).json({ error: 'Invalid productid or quantity' });
            }

            const existingCartItem = await Cart.findOne({ userid, productid });

            if (existingCartItem) {
                if (qty === 0) {
                    // Remove item if quantity is zero
                    await Cart.deleteOne({ userid, productid });
                } else if (qty !== existingCartItem.quantity) {
                    // Update quantity if changed
                    existingCartItem.quantity = qty;
                    await existingCartItem.save();
                }
                // Else do nothing (same quantity)
            } else {
                if (qty > 0) {
                    // Add new item if not exists and quantity > 0
                    const newItem = new Cart({ userid, productid, quantity: qty });
                    await newItem.save();
                }
                // Else do nothing
            }
        }

        return res.status(200).json({ message: 'Cart updated successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }

});

  


// Get all products in the cart for a user
router.get('/getcart/:userid', async(req, res) => {
    const { userid } = req.params

    try {
        const cartItems = await Cart.find({ userid }).populate('productid');

        let carttotal = 0;
        console.log(cartItems);
        
const cartDetails = cartItems.map(item => {
  const product = item.productid;
  const itemtotal = product.price * item.quantity;
  carttotal += itemtotal;

  return {
    productid: product._id,
    productname: product.productname,
    price: product.price,
    quantity: item.quantity,
    itemtotal
  };
});

return res.status(200).json({
  cart: cartDetails,
  carttotal
});
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})


// Remove a product from the cart
router.delete('/removefromcart/:userid/:productid', async (req, res) => {
    const { userid, productid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userid) || !mongoose.Types.ObjectId.isValid(productid)) {
        return res.status(400).json({ error: 'Invalid userid or productid' });
    }

    try {
        const result = await Cart.deleteOne({ userid, productid });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Item not found in cart' });
        }

        return res.status(200).json({ message: 'Item removed from cart successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router