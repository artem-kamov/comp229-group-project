const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    currency: String,
    location: String,
    seller: {
      id: String,
      name: String
    },
    image: String,
    category: String,
    postedAt: Date
  });

module.exports = mongoose.model('product', ProductSchema);


