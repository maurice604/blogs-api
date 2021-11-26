const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  const { authorization } = req.headers;
  const { body } = req;
  const { status, response } = await categoryService.insertCategory(authorization, body);
  return res.status(status).json(response);
};

const getAllCategories = async (req, res) => {
    const { authorization } = req.headers;
    const { status, response } = await categoryService.findAllCategories(authorization);
    return res.status(status).json(response);
};

module.exports = {
  createCategory,
  getAllCategories,
};
