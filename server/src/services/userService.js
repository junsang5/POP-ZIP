const User = require("../models/User");
const bcrypt = require("bcryptjs");

const createUser = async (userData) => {
  console.log(userData);
  const hashedPassword = bcrypt.hashSync(userData.password, 8);
  console.log(hashedPassword);
  try {
    const newUser = await User.create({
      ...userData,
      password: hashedPassword,
    });
    console.log("user create!");
    return newUser;
  } catch (error) {
    console.error("Error during user creation:", error);
    throw error;
  }
};

const getUserById = async (userid) => {
  const user = await User.findByPk(userid);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

module.exports = {
  createUser,
  getUserById,
};
