const User = require("../models/userSchema");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../services/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/"); // Redirect to home or dashboard after signup
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", {
      error: "Invalid email or password",
    });
  }
  const token = setUser(user);
  res.cookie("token", token, { httpOnly: true });
  return res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
