const { nanoid } = require("nanoid");
const URL = require("../models/urlSchema");
const port = 3000;

async function createShortUrl(req, res) {
  const shortId = nanoid(8);
  const { redirectUrl } = req.body;
  if (!redirectUrl) {
    return res.status(400).json({ error: "Redirect URL is required" });
  }
  await URL.create({
    shortId,
    redirectUrl,
    visitHistory: [],
    createdBy: req.user._id,
  });
  return res.render("home", {
    id: shortId,
    port: port,
  });
}

async function getAnalysis(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOne({
    shortId,
  });
  return res.json({
    totalCLicks: entry.visitHistory.length,
    analysis: entry.visitHistory,
  });
}

module.exports = {
  createShortUrl,
  getAnalysis,
};
