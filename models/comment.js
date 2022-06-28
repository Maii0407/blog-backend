const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  username: {
    type: String,
    required: true,
    maxLength: 20
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model( 'Comment', CommentSchema );