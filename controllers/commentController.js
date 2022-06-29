const Comment = require( '../models/comment' );

exports.commentList = ( req, res, next ) => {
  res.send( 'Comment list GET' );
};

exports.commentCreate = ( req, res, next ) => {
  res.send( 'Comment create POST' );
};

exports.commentDelete = ( req, res, next ) => {
  res.send( 'Comment delete DELETE' );
};

exports.commentUpdate = ( req, res, next ) => {
  res.send( 'Comment update PUT' );
};