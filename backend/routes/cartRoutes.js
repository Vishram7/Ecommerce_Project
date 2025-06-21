const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const mongoose = require("mongoose");
const verifyToken = require("../middlewares/verifyToken");

// Add a product to the cart
router.post("/addtocart", verifyToken, async (req, res) => {
  const { productid } = req.body;
  const { userid } = req.user;

  try {
    // Check if product already exists in cart
    const exists = await Cart.findOne({ userid, productid });
    if (exists) {
      return res
        .status(200)
        .json({ statusCode: 202, message: "Product already in cart" });
    }

    const newCartItem = new Cart({
      userid,
      productid,
      quantity: 1,
    });

    await newCartItem.save();
    return res
      .status(201)
      .json({ statusCode: 201, message: "Product added to cart" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Get all products in the cart for a user
router.get("/getcart", verifyToken, async (req, res) => {
  const { userid } = req.user;

  try {
    const cartItems = await Cart.find({ userid }).populate("productid");

    let totalActualPrice = 0;
    let totalDiscount = 0;

    const cartDetails = cartItems.map((item) => {
      const product = item.productid;

      const imageurl = product.imageurl;
      const actualPrice = product.actualprice;
      const discount = product.discount || 0;
      const quantity = item.quantity;

      const itemActualTotal = actualPrice * quantity;
      const itemDiscountTotal = discount * quantity;
      const itemFinalTotal = itemActualTotal - itemDiscountTotal;

      totalActualPrice += itemActualTotal;
      totalDiscount += itemDiscountTotal;

      return {
        productid: product._id,
        productname: product.productname,
        imageurl,
        quantity,
        actualprice: actualPrice,
        discount,
        price: actualPrice - discount, // final price per unit
        itemTotal: itemFinalTotal, // final total for this cart item
      };
    });

    const cartTotal = totalActualPrice - totalDiscount;

    return res.status(200).json({
      data: {
        cartDetails,
        totalActualPrice,
        totalDiscount,
        cartTotal,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Remove a product from the cart
router.post("/removefromcart", verifyToken, async (req, res) => {
  const { productid } = req.body;
  const { userid } = req.user;

  if (
    !mongoose.Types.ObjectId.isValid(userid) ||
    !mongoose.Types.ObjectId.isValid(productid)
  ) {
    return res.status(400).json({ error: "Invalid userid or productid" });
  }

  try {
    const result = await Cart.deleteOne({ userid, productid });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    return res.status(200).json({ statusCode: 200, message: "Item removed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
