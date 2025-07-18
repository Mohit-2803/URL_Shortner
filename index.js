const express = require("express");
const urlRoutes = require("./routes/urlRoutes");
const dbConnect = require("./databases/db_connect");
const URL = require("./models/urlSchema");
const staticRoute = require("./routes/staticRouter");
const app = express();
const path = require("path");
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

dbConnect();

app.use("/url", urlRoutes);
app.use("/", staticRoute);

// app.get("/test", async (req, res) => {
//   const allUrls = await URL.find({});
//   return res.render("home", {
//     urls: allUrls,
//   });
// });

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { ipAddress: req.ip } } }
  );
  res.redirect(entry.redirectUrl);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
