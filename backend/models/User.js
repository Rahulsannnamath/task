const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  totalPoints: Number,
});

module.exports = mongoose.model('User', userSchema);


