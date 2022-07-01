const dotenv = require( 'dotenv' );
dotenv.config();

const { body, validationResult } = require( 'express-validator' );
const jwt = require( 'jsonwebtoken' );
const async = require( 'async' );

const Post = require( '../models/post' );
const Comment = require( '../models/comment' );

exports.postList = ( req, res, next ) => {
  Post.find({ postStatus: 'published' }, 'user title content postStatus date').sort({ date: -1 })
    .populate( 'user' ).exec( ( err, postList ) => {
      if( err ) { return next( err ); }

      res.json({ postList })
    })
};

exports.postDetail = ( req, res, next ) => {
  async.parallel({
    post: ( callback ) => {
      Post.findById( req.params.postId ).populate( 'user' ).exec( callback );
    },
    comments: ( callback ) => {
      Comment.find({ 'post': req.params.postId }, '_id').exec( callback );
    }
  }, ( err, results ) => {
    if( err ) { return next( err ); }
    if( results.post === null ) {
      const err = new Error( 'Post not found' );
      err.status = 404;
      return next( err );
    }

    res.json({
      post: results.post,
      comments: results.comments
    });
  })
};

exports.postCreate = [
  body( 'title', 'Title must not be empty' ).trim().isLength({ min: 1 }).escape(),
  body( 'content', 'Title must not be empty' ).trim().isLength({ min: 1 }).escape(),
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

      return res.json({ post });
    })
  }
];

exports.postDelete = ( req, res, next ) => {
  Post.findById( req.params.postId ).exec( ( err, post ) => {
    if( post ) {
      post.remove();
      return res.json({ message: 'Post deleted...' });
    }

    return res.json({ message: 'Failed post delete...' });
  });
};

exports.postUpdate = [
  body( 'title', 'Title must not be empty' ).trim().isLength({ min: 1 }).escape(),
  body( 'content', 'Title must not be empty' ).trim().isLength({ min: 1 }).escape(),
  body( 'postStatus' ).trim().isLength({ min: 1 }).escape(),

  ( req, res, next ) => {
    const errors = validationResult( req );

    const post = new Post({
      user: req.user._id,
      title: req.body.title,
      content: req.body.content,
      postStatus: req.body.postStatus,
      date: new Date(),
      _id: req.params.postId
    });

    if( !errors.isEmpty() ) {
      return res.json({ errors: errors.array() })
    }
    else {
      Post.findByIdAndUpdate( req.params.postId, post, {}, ( err, thepost ) => {
        if( err ) { return next( err ); }

        res.json({
          message: 'Post Updated...',
          thepost
        })
      })
    }
  }
];