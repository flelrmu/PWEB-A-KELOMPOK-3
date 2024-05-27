var express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const logger = require('morgan');
const hbs = require('hbs');

require('dotenv').config();

const routeIndex = require("./routes/index.js");
const routeUsers = require("./routes/users.js");
const routeAdmin = require("./routes/admin.js");
const routeDosen = require("./routes/dosen.js");
const app = express();

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use("/", routeIndex);
app.use("/", routeUsers);
app.use('/admin', routeAdmin);
app.use('/dosen', routeDosen);

app.use((req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    res.locals.userLoggedIn = true;
  } else {
    res.locals.userLoggedIn = false;
  }
  next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
