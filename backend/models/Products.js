const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productname: String,
  actualprice: Number,
  discount: { type: Number, default: 0 },
  imageurl: {
    type: String, // Store the Cloudinary image URL
    required: true, // Optional: only if you always need an image
  },
});

// Virtual field for discounted price
productSchema.virtual("price").get(function () {
  return this.actualprice - this.discount;
});

// Make sure virtuals are included in JSON responses
productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Product", productSchema);
