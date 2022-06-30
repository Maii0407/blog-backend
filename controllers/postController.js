const dotenv = require( 'dotenv' );
dotenv.config();

const { body, validationResult } = require( 'express-validator' );
const jwt = require( 'jsonwebtoken' );

const Post = require( '../models/post' );

exports.postList = ( req, res, next ) => {
  res.send( 'Post list GET' );
};

exports.postDetail = ( req, res, next ) => {
  res.send( 'Post detail GET' )
};

exports.postCreate = [
  body( 'title' ).trim().isLength({ min: 1 }).escape(),
  body( 'content' ).trim().isLength({ min: 1 }).escape(),
  body( 'postStatus' ).trim().isLength({ min: 1 }).escape(),

  ( req, res, next ) => {
    const errors = validationResult( req );

    const post = new Post({
      user: req.user._id,
      title: req.body.title,
      content: req.body.content,
      postStatus: req.body.postStatus,
      date: new Date()
    }).save( err => {
      if( err ) { return next( err ); }

      res.json({
        message: 'Post created...',
        authData: req.user,
        post
      });
    })
  }
];

exports.postDelete = ( req, res, next ) => {
  res.send( 'Post delete DELETE' );
};

exports.postUpdate = ( req, res, next ) => {
  res.send( 'Post update PUT' );
};