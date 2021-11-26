require('dotenv').config();
// const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const postSchema = require('../schema/postSchema');
const basicSchema = require('../schema/basicSchema');
const { BlogPost, PostsCategory, User, Category } = require('../models');
const { created, ok, noContent } = require('../helpers/statusCode');
// const { findAllUsers } = require('./usersServices');

const { JWT_SECRET } = process.env;

const insertPost = async (token, data) => {
  const incompleteData = postSchema.incompleteData(data);
  if (incompleteData) return incompleteData;

  const unauthorizedToken = basicSchema.unauthorizedToken(token);
  if (unauthorizedToken) return unauthorizedToken;

  const invalidCategoryIds = await postSchema.invalidCategoryIds(data.categoryIds);
  if (invalidCategoryIds) return invalidCategoryIds;

  const { id: userId } = jwt.verify(token, JWT_SECRET);
  const { title, content, categoryIds } = data;
  const published = Date.now();
  const postData = { title, content, userId, published, updated: published };

  const newPost = await BlogPost.create(postData);
  const { dataValues } = newPost;

  categoryIds.forEach(async (categoryId) => {
    const postCategory = { postId: dataValues.id, categoryId };
    await PostsCategory.create(postCategory);
  });

  return { status: created, response: { id: dataValues.id, userId, title, content } };
};

const clearCategoryData = ({ id, name }) => ({ id, name });
const clearCategoryFromArray = (categories) => categories.map(clearCategoryData);

const getValues = ({ dataValues }) => {
  const { dataValues: userData } = dataValues.user;

  const { password, ...userWithoutPass } = userData;
  const allCategories = clearCategoryFromArray(dataValues.categories);
  return { ...dataValues, user: userWithoutPass, categories: allCategories };
};

const getValuesFromArray = (blogPosts) => blogPosts.map(getValues);

const findAllPosts = async (token) => {
  const unauthorizedToken = basicSchema.unauthorizedToken(token);
  if (unauthorizedToken) return unauthorizedToken;

  const allPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories' },
    ],
  });

  const clearData = getValuesFromArray(allPosts);
  return { status: ok, response: clearData };
};

const findPostById = async (token, id) => {
  const unauthorizedToken = basicSchema.unauthorizedToken(token);
  if (unauthorizedToken) return unauthorizedToken;

  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories' },
    ],
  });

  const postDoesNotFound = postSchema.postDoesNotExist(post);
  if (postDoesNotFound) return postDoesNotFound;

  const postData = getValues(post);
  return { status: ok, response: postData };
};

const updatePost = async (token, id, data) => {
  const invalidCategoryProperty = postSchema.invalidCategoryPropriety(data);
  if (invalidCategoryProperty) return invalidCategoryProperty;

  const unauthorizedToken = basicSchema.unauthorizedToken(token);
  if (unauthorizedToken) return unauthorizedToken;

  const { response } = await findPostById(token, id);
  const { userId, categories } = response;
  const invalidUserPermission = basicSchema.invalidPermission(token, userId);
  if (invalidUserPermission) return invalidUserPermission;

  const incompleteDataForUpdate = postSchema.incompleteDataUpdate(data);
  if (incompleteDataForUpdate) return incompleteDataForUpdate;

  const { title, content } = data;
  await BlogPost.update({ title, content, updated: Date.now() }, { where: { id } });
  const updatedPost = { title, content, userId, categories };
  return { status: ok, response: updatedPost };
};

const deletePost = async (token, id) => {
  const unauthorizedToken = basicSchema.unauthorizedToken(token);
  if (unauthorizedToken) return unauthorizedToken;

  const post = await BlogPost.findByPk(id);
const postDoesNotFound = postSchema.postDoesNotExist(post);
  if (postDoesNotFound) return postDoesNotFound;

  const { response } = await findPostById(token, id);
  const { userId } = response;
  const invalidUserPermission = basicSchema.invalidPermission(token, userId);
  if (invalidUserPermission) return invalidUserPermission;

  const deleted = await BlogPost.destroy({ where: { id } });
  return { status: noContent, response: deleted };
};

// teste

/* const formatBlogPostObject = (user, blogPost) => {
  const newBlogPost = { ...blogPost, user };
  delete newBlogPost.UserId;
  return newBlogPost;
};

const authorizedToken = (token) => {
  basicSchema.unauthorizedToken(token);
  if (authorizedToken) return authorizedToken;
}; 

const invalidate = async (token, id) => {
const { response } = await findPostById(token, id);
  const { userId } = response;
  const invalidUserPermission = basicSchema.invalidPermission(token, userId);
  if (invalidUserPermission) return invalidUserPermission;
};

const getPostsBySearchTerm = async (token, id, searchTerm) => {
  authorizedToken(token); invalidate(token, id); const users = await findAllUsers();
  const allCategories = await getValues();
  const allPostsCategories = await PostsCategory.findAll();
  const blogPosts = await BlogPost.findAll({ where:
    { [Op.or]: [{ title: { [Op.substring]: searchTerm } },
    { content: { [Op.substring]: searchTerm } }] } });
  const blogPostsReport = blogPosts.map((blogPost) => { 
    const user = users.find((us) => us.id === blogPost.userId);
    const newBlogPost = formatBlogPostObject(user, blogPost.dataValues);
    const postsCategories = allPostsCategories.filter((postCat) => postCat.postId === blogPost.id);
    const categories = postsCategories.map((postsCategory) => {
      const category = allCategories.find((cat) => cat.id === postsCategory.categoryId);
      return category;
  });
  newBlogPost.categories = categories;
  return newBlogPost;
  });
  return blogPostsReport;
};
*/
// teste */

module.exports = {
  insertPost,
  findAllPosts,
  findPostById,
  updatePost,
  deletePost,
  // getPostsBySearchTerm,
};
