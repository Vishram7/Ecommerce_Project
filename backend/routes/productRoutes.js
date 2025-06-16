const express = require('express');
const router = express.Router();
const Product = require('../models/Products');
const mongoose = require('mongoose');




// Create a new product
router.post('/addproduct', async(req, res) => {
    const { productname, price } = req.body;

    try {
        const newProduct = new Product({ productname, price });
        await newProduct.save();
        return res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})



// Get all products
router.get('/getproducts', async(req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({data: products});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})


//Update a product
router.put('/updateproduct/:productid', async(req, res) => {
    const {productid} = req.params
    const {productname, price} = req.body

    try{
        if (!mongoose.Types.ObjectId.isValid(productid)) {
            return res.status(400).json({ error: 'Invalid product ID' });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            productid,
            { productname, price },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        return res.status(200).json({ message: 'Product updated successfully', data: updatedProduct });
    }catch(error) {
        return res.status(500).json({ error: error.message });
    }
})
module.exports = router;