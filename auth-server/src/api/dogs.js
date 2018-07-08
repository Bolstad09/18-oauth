'use strict';

import mongoose from 'mongoose';

const dogsSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  style: {type: String, required: true},
  toppings: {type: String, required: true},
  userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

module.exports = mongoose.model('Dogs', dogsSchema);