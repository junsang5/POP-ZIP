const userService = require("../services/userService");

exports.signup = async (req, res) => {
  try {
    console.log('signup req: ', req.body);
    const user = await userService.createUser(req.body);
    res.status(201).json(user); // json({state: 201, user: user})
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.userid);
    res.status(201).json(user); // json({state: 201, user: user})
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
