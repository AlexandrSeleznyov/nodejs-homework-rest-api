const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { User } = require("../../model");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user);
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }
  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({
    name,
    email,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = register;
