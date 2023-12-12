const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: String,
    description: String,
    price: Number,
    currency: String,
    location: String,
    image: String,
    category: String,
    postedAt: Date,
    // Adds relationship with User
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    isActive: {
      type: Boolean,
      default: true
    },
    lifetime: {
      startDate: {
        type: Date,
        default: Date.now
      },
      endDate: {
        type: Date,
        default: null 
      }
    }
  },
  {
    collection: "products"
  }
);


// Ensure virtual fields are serialised.
ProductSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

module.exports = mongoose.model('product', ProductSchema);


