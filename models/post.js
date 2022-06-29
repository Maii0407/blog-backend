const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  postStatus: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

PostSchema.pre( 'remove', function( next ) {
  this.model( 'Comment' ).deleteMany({ post: this._id }, next);
});

module.exports = mongoose.model( 'Post', PostSchema );