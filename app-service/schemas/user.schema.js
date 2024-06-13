const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the user schema
const userSchema = new Schema({
  userId: { type: String, required: true }
});

// Create a index on userId
userSchema.index({ userId: 1 });

const User = mongoose.model('User', userSchema);

module.exports = User;
