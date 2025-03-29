const db = require('../models');
const User = db.User;

const generateRandomCode = (length = 6) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

exports.generateUniqueReveralCode = async () => {
  let reveralCode;
  let isUnique = false;

  while (!isUnique) {
    reveralCode = generateRandomCode(6);
    const existingUser = await User.findOne({ where: { reveral_code: reveralCode } });
    if (!existingUser) {
      isUnique = true;
    }
  }

  return reveralCode;
};
