const { User } = require('../models');

const emailValidation = /^[\w.]+@[\w]+(.[\w]+)+$/;

const itBlank = (value) => value === '';
const stringSize = (text, min) => text.length < min;
const itEmailInvalid = (email) => !email.match(emailValidation);
const incorrectPassword = (password, userPassword) => password !== userPassword;

const itEmailRegistered = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user !== null;
};

module.exports = { 
  itBlank,
  itEmailInvalid,
  stringSize,
  itEmailRegistered,
  incorrectPassword,
};
