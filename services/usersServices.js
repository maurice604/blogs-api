const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User } = require('../models');
const { created, ok, noContent } = require('../helpers/statusCode');
const userSchema = require('../schema/userSchema');
const basicSchema = require('../schema/basicSchema');
// const { noContent } = require('../helpers/errors');

const { JWT_SECRET } = process.env;

const userNoPassword = (user) => {
  const { password, ...userData } = user.dataValues;
  return userData;
};

const passwordlessUsers = (users) => users.map(userNoPassword);

const insertUser = async (data) => {
  const incompleteData = userSchema.invalidUserCreationData(data);
  if (incompleteData) return incompleteData;

  const invalidData = await userSchema.invalidUserCreation(data);
  if (invalidData) return invalidData;

  const { dataValues } = await User.create(data);
  const { password, ...payload } = dataValues;
  const token = jwt.sign(payload, JWT_SECRET);

  return { status: created, response: { token } };
};

const findAllUsers = async (token) => {
  const unauthorizedToken = basicSchema.unauthorizedToken(token);
  if (unauthorizedToken) return unauthorizedToken;

  const allUsers = await User.findAll();
  const users = passwordlessUsers(allUsers);
  return { status: ok, response: users };
};

const findUserById = async (token, id) => {
  const unauthorizedToken = basicSchema.unauthorizedToken(token);
  if (unauthorizedToken) return unauthorizedToken;

  const user = await User.findByPk(id);
  const invalidUser = userSchema.invalidUser(user);
  if (invalidUser) return invalidUser;

  const userData = userNoPassword(user);
  return { status: ok, response: userData };
};

const removeUser = async (token) => {
  const unauthorizedToken = basicSchema.unauthorizedToken(token);
  if (unauthorizedToken) return unauthorizedToken;

  const deleted = await User.destroy({ where: { email: token } });
  return { status: noContent, response: deleted };
};

module.exports = {
  insertUser,
  findAllUsers,
  findUserById,
  removeUser,
};
