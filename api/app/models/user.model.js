const mongoose = require('mongoose');

const userModel = mongoose.Schema({  
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  is_admin: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userModel);