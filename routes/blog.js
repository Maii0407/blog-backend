const express = require('express');
const router = express.Router();

const userController = require( '../controllers/userController' );
const postController = require( '../controllers/postController' );
const commentController = require( '../controllers/commentController' );

/* GET home page. */
router.get( '/', postController.postList );

router.post( '/posts/create', postController.postCreate );
router.get( '/posts/:postId', postController.postDetail );
router.delete( '/posts/:postId', postController.postDelete );
router.put( '/posts/:postId', postController.postUpdate );

router.post( '/comments/create', commentController.commentCreate );
router.delete( '/comments/:commentId', commentController.commentDelete );
router.put( '/comments/:commentId', commentController.commentUpdate );

router.post( '/user/create', userController.userSignUp );

module.exports = router;