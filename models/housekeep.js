const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const houseSchema = new Schema({
  systemUserId: Number,
  contents: Array,
  upload_date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('house', houseSchema);