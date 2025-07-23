const { getUser } = require("../services/auth");

function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;
  if (!tokenCookie) {
    return next();
  }
  const token = tokenCookie;
  const user = getUser(token);
  req.user = user;
  return next();
}

function restrictTo(roles) {
  return function (req, res, next) {
    if (!req.user || !roles.includes(req.user.role)) {
      console.log("Unauthorized access attempt by user:", req.user);
      return res.end("Unauthorized");
    }

    return next();
  };
}

module.exports = {
  checkForAuthentication,
  restrictTo,
};
