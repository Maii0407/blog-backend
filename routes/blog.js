const express = require('express');
const router = express.Router();
const passport = require( 'passport' );

const userController = require( '../controllers/userController' );
const postController = require( '../controllers/postController' );
const commentController = require( '../controllers/commentController' );

/* GET home page. */
router.get( '/posts', postController.postList );

router.post(
  '/posts',
  passport.authenticate( 'jwt', { session: false }),
  postController.postCreate
);

router.get( '/posts/:postId', postController.postDetail );
router.delete( '/posts/:postId', postController.postDelete );
router.put( '/posts/:postId', postController.postUpdate );

router.post( '/comments', commentController.commentCreate );
router.delete( '/comments/:commentId', commentController.commentDelete );
router.put( '/comments/:commentId', commentController.commentUpdate );

router.post( '/user', userController.userSignUp );
router.post( '/login', userController.userLogin );

module.exports = router;