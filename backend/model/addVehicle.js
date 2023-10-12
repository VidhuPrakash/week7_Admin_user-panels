const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  manufacturer: String,
  model: String,
  price: Number,
  image: String,
  description: String, 
  quantity: { type: Number, default: 0 }
});

productSchema.methods.incrementQuantity = function() {
  this.quantity += 1;
  return this.save();
}

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
