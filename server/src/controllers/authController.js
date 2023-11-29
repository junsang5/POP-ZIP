const authService = require("../services/authService");

exports.login = async (req, res) => {
  try {
    const { userid, password } = req.body;
    console.log('login id pw: ', userid, ' ', password);
    const {user, token} = await authService.login(userid, password);
    res.json({ user, token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
