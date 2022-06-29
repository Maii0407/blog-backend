const Post = require( '../models/post' );

exports.postList = ( req, res, next ) => {
  res.send( 'Post list GET' );
};

exports.postDetail = ( req, res, next ) => {
  res.send( 'Post detail GET' )
};

exports.postCreate = ( req, res, next ) => {
  res.send( 'Post create POST' );
};

exports.postDelete = ( req, res, next ) => {
  res.send( 'Post delete DELETE' );
};

exports.postUpdate = ( req, res, next ) => {
  res.send( 'Post update PUT' );
};