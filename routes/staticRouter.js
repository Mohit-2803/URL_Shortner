const express = require("express");
const URL = require("../models/urlSchema");
const { restrictTo } = require("../middlewares/authMiddleware");

const router = express.Router();

// Route to get all URLs of all users
router.get("/admin/urls", restrictTo(["admin"]), async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
  });
});

// Route to get all URLs of the logged-in user
router.get("/", restrictTo(["user", "admin"]), async (req, res) => {
  const allUrls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: allUrls,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
