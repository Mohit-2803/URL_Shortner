const express = require("express");
const urlRoutes = require("./routes/urlRoutes");
const dbConnect = require("./databases/db_connect");
const URL = require("./models/urlSchema");
const staticRoute = require("./routes/staticRouter");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const {
  checkForAuthentication,
  restrictTo,
} = require("./middlewares/authMiddleware");

const app = express();
const path = require("path");
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

dbConnect();

app.use("/url", restrictTo(["user"]), urlRoutes);
app.use("/user", userRoutes);
app.use("/", staticRoute);

// handle favicon requests error
app.get("/favicon.ico", (req, res) => {
  res.sendStatus(204);
});

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
