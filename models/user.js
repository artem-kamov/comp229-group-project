const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  fullName: String,
  dateOfBirth: Date,
  address: {
    street: String,
    city: String,
    province: String,
    postalCode: String
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('user', UserSchema);
