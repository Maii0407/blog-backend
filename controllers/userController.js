const dotenv = require( 'dotenv' );
dotenv.config();

const { body, validationResult } = require( 'express-validator' );
const bcrypt = require( 'bcryptjs' );
const jwt = require( 'jsonwebtoken' );

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

exports.userLogin = ( req, res, next ) => {
  let { userID, password } = req.body;

  if( userID === `${ process.env.USERID }` ) {
    if( password === `${ process.env.SECRETKEY }` ) {
      const opts = {}
      opts.expiresIn = 120; //token expires in 2 min
      const secret = `${ process.env.SECRETKEY }`;
      const token = jwt.sign({ userID }, secret, opts );

      return res.status(200).json({
        message: 'Auth Passed',
        token
      });
    }
    return res.status(401).json({ message: 'Auth Failed' })
  }
};

exports.userProtected = ( req, res, next ) => {
  return res.status(200).send( 'This is a protected route' )
};