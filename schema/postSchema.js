const { Category } = require('../models');

const statusCode = require('../helpers/statusCode');
const errors = require('../helpers/errors');

const result = (status, response) => ({ status, response });

const incompleteData = (data) => {
  const { badRequest } = statusCode;
  const { noContent, noCategoryIds, noTitle } = errors;
  if (!data.title) return result(badRequest, noTitle);
  if (!data.content) return result(badRequest, noContent);
  if (!data.categoryIds) return result(badRequest, noCategoryIds);
  return null;
};

const invalidCategoryIds = async (ids) => {
  const { badRequest } = statusCode;
  const { categoryIdNotFound } = errors;

  const allIds = await Category.findAll({ where: { id: ids } });
  if (allIds.length !== ids.length) return result(badRequest, categoryIdNotFound);

  return null;
};

const postDoesNotExist = (post) => {
  const { notFound } = statusCode;
  const { postNotFound } = errors;

  if (!post) {
    return result(notFound, postNotFound);
  }

  return null;
};

const invalidCategoryPropriety = (data) => {
  const { badRequest } = statusCode;
  const { categoriesCannotBeEdited } = errors;
  if (data.categoryIds) {
    return result(badRequest, categoriesCannotBeEdited);
  }
  return null;
};

const incompleteDataUpdate = (data) => {
  const { badRequest } = statusCode;
  const { noContent, noTitle } = errors;
  if (!data.title) return result(badRequest, noTitle);
  if (!data.content) return result(badRequest, noContent);
  return null;
};

module.exports = {
  incompleteData,
  invalidCategoryIds,
  postDoesNotExist,
  invalidCategoryPropriety,
  incompleteDataUpdate,
};
