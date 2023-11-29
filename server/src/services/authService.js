require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (userid, password) => {
  const user = await User.findOne({ where: { userid } });
  console.log('[login] find user: ', user);
  if (!user) {
    throw new Error("Authentication failed. User not found.");
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    throw new Error("Authentication failed. Wrong password.");
  }

  const token = jwt.sign({ id: user.userid }, process.env.JWT_SECRET, {
    expiresIn: 86400, // 24 hours
  });

  return {user, token};
};

module.exports = {
  login,
};
