const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const commentSchema = new Schema({
  contents: String,
  author: String,
  systemUserId: Number,
  comment_date: {type: Date, default: Date.now()}
});
 
const boardSchema = new Schema({
  contents: String,
  author: String,
  systemUserId: Number,
  board_date: {type: Date, default: Date.now()},
  comments: [commentSchema]
});
 
module.exports = mongoose.model('board', boardSchema);