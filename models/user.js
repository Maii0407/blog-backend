const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userID: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre( 'remove', function( next ) {
  this.model( 'Post' ).deleteMany({ user: this._id }, next);
});

module.exports = mongoose.model( 'User', UserSchema );