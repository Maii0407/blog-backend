const express = require('express');
const router = express.Router();
const passport = require( 'passport' );

const userController = require( '../controllers/userController' );
const postController = require( '../controllers/postController' );
const commentController = require( '../controllers/commentController' );

/* GET home page. */
router.post( '/user', userController.userSignUp );
router.post( '/login', userController.userLogin );

//posts routes
router.get( '/posts', postController.postList );

router.post(
  '/posts',
  passport.authenticate( 'jwt', { session: false }),
  postController.postCreate
);

router.get( '/posts/:postId', postController.postDetail );

router.delete(
  '/posts/:postId',
  passport.authenticate( 'jwt', { session: false }),
  postController.postDelete
);
router.put(
  '/posts/:postId',
  passport.authenticate( 'jwt', { session: false }),
  postController.postUpdate
);

//comments routes
router.get( '/posts/:postId/comments', commentController.commentList );
router.post( '/posts/:postId/comments', commentController.commentCreate );

router.delete(
  '/posts/:postId/comments/:commentId',
  passport.authenticate( 'jwt', { session: false }),
  commentController.commentDelete
);

module.exports = router;