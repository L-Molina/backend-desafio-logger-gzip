const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: { type: String, required: true, max: 100 },  
  email: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
});

module.exports = new model('User', userSchema);