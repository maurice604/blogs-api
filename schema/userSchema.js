const validations = require('../helpers/validations');
const statusCode = require('../helpers/statusCode');
const errors = require('../helpers/errors');

const result = (status, response) => ({ status, response });

const invalidUserCreationData = (data) => {
  const { badRequest } = statusCode;
  const { noEmail, noPassword } = errors;
  if (!data.email) {
    return result(badRequest, noEmail);
  }

  if (!data.password) {
    return result(badRequest, noPassword);
  }

  return null;
};

const invalidUserCreation = async (data) => {
  const { stringSize, itEmailInvalid, itEmailRegistered } = validations;
  const { badRequest, conflict } = statusCode;
  const { shortDisplayName, invalidEmail, shortPassword, userRegistered } = errors;
  const { displayName, email, password } = data;

  switch (true) {
  case stringSize(displayName, 8):
    return result(badRequest, shortDisplayName);
  case itEmailInvalid(email):
    return result(badRequest, invalidEmail);
  case stringSize(password, 6):
    return result(badRequest, shortPassword);
  case await itEmailRegistered(email):
    return result(conflict, userRegistered);
  default:
    return null;
  }
};

const invalidUser = (user) => {
  const { notFound } = statusCode;
  const { userNotExist } = errors;

  if (!user) return result(notFound, userNotExist);
  return null;
};

module.exports = {
  invalidUserCreation,
  invalidUserCreationData,
  invalidUser,
};
