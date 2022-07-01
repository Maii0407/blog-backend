const { body, validationResult } = require( 'express-validator' );

const Comment = require( '../models/comment' );

exports.commentList = ( req, res, next ) => {
  Comment.find({ post: req.params.postId }).sort({ date: -1 })
    .populate( 'post' ).exec( ( err, commentList ) => {
      if( err ) { return next( err ); }

      return res.json({ commentList });
    })
};

exports.commentCreate = [
  body( 'username', 'Username must not be empty' ).trim().isLength({ min: 1 }).escape(),
  body( 'content', 'Content must not be empty' ).trim().isLength({ min: 1 }).escape(),

  ( req, res, next ) => {
    const errors = validationResult( req );

    const comment = new Comment({
      post: req.params.postId,
      username: req.body.username,
      content: req.body.content,
      date: new Date()
    }).save( err => {
      if( err ) { return next( err ); }

      return res.json({ comment })
    })
  }
];

exports.commentDelete = ( req, res, next ) => {
  Comment.findById( req.params.commentId ).exec( ( err, comment ) => {
    if( comment ) {
      comment.remove();
      return res.json({ message: 'Comment deleted...' })
    }

    return res.json({ message: 'Failed comment delete...' })
  })
};

exports.commentUpdate = ( req, res, next ) => {
  res.send( 'Comment update PUT' );
};