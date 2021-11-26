const express = require('express');
const postController = require('../controllers/postController');

const postRouter = express.Router();

postRouter.post('/', postController.createPost);
// postRouter.get('/search', postController.listPosts);
postRouter.get('/', postController.getAllPosts);
postRouter.get('/:id', postController.getPost);
postRouter.put('/:id', postController.updatePost);
postRouter.delete('/:id', postController.deletePost);

module.exports = postRouter;
