const statusCode = require('../helpers/statusCode');
const errors = require('../helpers/errors');

const result = (status, response) => ({ status, response });

const incompleteData = (data) => {
  const { badRequest } = statusCode;
  const { noName } = errors;
  if (!data.name) return result(badRequest, noName);
  return null;
};

module.exports = {
  incompleteData,
};
