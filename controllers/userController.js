const { body, validationResult } = require( 'express-validator' );
const bcrypt = require( 'bcryptjs' );

const User = require( '../models/user' );

exports.userSignUp = [
  body( 'userID' ).trim().isLength({ min:1 }).escape(),
  body( 'password' ).trim().isLength({ min: 1 }).escape(),

  ( req, res, next ) => {
    const errors = validationResult( req );

    bcrypt.hash( req.body.password, 10, ( err, hashedPassword ) => {
      if( err ) { return next( err ); }

      const user = new User({
        userID: req.body.userID,
        password: hashedPassword
      }).save( err => {
        if( err ) { return next( err ) }
  
        res.json({ user });
      })
    })
  }
];