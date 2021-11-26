const postService = require('../services/postService');

const createPost = async (req, res) => {
  const { authorization } = req.headers;
  const { body } = req;
  const { status, response } = await postService.insertPost(authorization, body);
  return res.status(status).json(response);
};

const getAllPosts = async (req, res) => {
  const { authorization } = req.headers;
  const { status, response } = await postService.findAllPosts(authorization);
  return res.status(status).json(response);
};

const getPost = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const { status, response } = await postService.findPostById(authorization, id);
  return res.status(status).json(response);
};

const updatePost = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const { body } = req;
  const { status, response } = await postService.updatePost(authorization, id, body);
  return res.status(status).json(response);
};

const deletePost = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;

  const { status, response } = await postService.deletePost(authorization, id);
  return res.status(status).json(response);
 };

module.exports = {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
};
