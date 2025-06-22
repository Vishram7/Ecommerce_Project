const express = require("express");
const router = express.Router();
const Product = require("../models/Products");
const mongoose = require("mongoose");
const verifyToken = require("../middlewares/verifyToken");
const upload = require("../middlewares/cloudinaryStorage");

// Create a new product
router.post("/addproduct", upload.single("productimage"), async (req, res) => {
  const { productname, actualprice, discount } = req.body;

  try {
    const imageurl = req?.file?.path;
    const newProduct = new Product({
      productname,
      actualprice,
      discount,
      imageurl,
    });
    await newProduct.save();
    return res
      .status(201)
      .json({ statusCode: 200, message: "Product added successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Get all products
router.get("/getproducts", verifyToken, async (req, res) => {
  const { userid } = req.user;
  //   console.log(userid);

  try {
    const products = await Product.find();
    return res.status(200).json({ data: products });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Update a product
router.put("/updateproduct/:productid", async (req, res) => {
  const { productid } = req.params;
  const { productname, price } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(productid)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productid,
      { productname, price },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res
      .status(200)
      .json({ message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Delet product
router.post("/deleteproduct", verifyToken, async (req, res) => {
  const { productid } = req.body;
  // const { userid } = req.user;

  try {
    const result = await Product.deleteOne({
      productid: productid,
    });
    console.log(result);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: error.message });
  }
});

//Get single product
router.get("/getproduct/:productid", async (req, res) => {
  const { productid } = req.params;

  try {
    const product = await Product.findOne({ _id: productid });
    if (!product) {
      return res
        .status(404)
        .json({ statusCode: 404, message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ statusCode: 500, message: "Internal server error" });
  }
});
module.exports = router;
