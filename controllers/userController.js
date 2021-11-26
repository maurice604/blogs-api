const usersServices = require('../services/usersServices');

const createUser = async (req, res) => {
  const { body } = req;
  const { status, response } = await usersServices.insertUser(body);
  return res.status(status).json(response);
};

const getAllUsers = async (req, res) => {
  const { authorization } = req.headers;
  const { status, response } = await usersServices.findAllUsers(authorization);
  return res.status(status).json(response);
};

const getUser = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const { status, response } = await usersServices.findUserById(authorization, id);
  return res.status(status).json(response);
};

const deleteOwnUser = async (req, res) => {
  const { authorization } = req.headers;
  const { status, response } = await usersServices.removeUser(authorization);
  return res.status(status).json(response);
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  deleteOwnUser,
};
