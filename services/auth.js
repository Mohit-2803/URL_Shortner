const jwt = require("jsonwebtoken");
const secketKey = "my-secret-key";

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secketKey,
    {
      expiresIn: "1h",
    }
  );
}

function getUser(token) {
  if (!token) {
    return null;
  }
  try {
    return jwt.verify(token, secketKey);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
