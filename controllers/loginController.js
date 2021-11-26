const loginService = require('../services/loginService');

const login = async (req, res) => {
  const { body } = req;
  const { status, response } = await loginService.login(body);
  return res.status(status).json(response);
};

module.exports = {
  login,
};
