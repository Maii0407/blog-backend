const User = require( '../models/user' );

exports.userSignUp = ( req,res, next ) => {
  res.send( 'Create new user POST' );
};