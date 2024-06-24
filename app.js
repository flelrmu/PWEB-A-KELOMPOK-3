var express = require("express");
const db = require('./config/db.js');
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const logger = require("morgan");
const hbs = require("hbs");
const bodyParser = require("body-parser");

require("dotenv").config();

const routeIndex = require("./routes/index.js");
const routeUsers = require("./routes/users.js");
const routeAdmin = require("./routes/admin.js");
const routeDosen = require("./routes/dosen.js");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));
hbs.registerPartials(path.join(__dirname, "views/partials"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routeIndex);
app.use("/", routeUsers);
app.use("/admin", routeAdmin);
app.use("/dosen", routeDosen);

app.use((req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    res.locals.userLoggedIn = true;
  } else {
    res.locals.userLoggedIn = false;
  }
  next();
});

const mysqlHost = process.env.MYSQL_ADDON_HOST || 'bjnbjumbl3x9qgpvunrg-mysql.services.clever-cloud.com';
const mysqlDb = process.env.MYSQL_ADDON_DB || 'bjnbjumbl3x9qgpvunrg';
const mysqlUser = process.env.MYSQL_ADDON_USER || 'ujdjfr5hlddkjj5c';
const mysqlPort = process.env.MYSQL_ADDON_PORT || 3306;
const mysqlPassword = process.env.MYSQL_ADDON_PASSWORD || 'HOUwjyZxLlv4oel0pY0n';
const mysqlUri = process.env.MYSQL_ADDON_URI || 'mysql://ujdjfr5hlddkjj5c:HOUwjyZxLlv4oel0pY0n@bjnbjumbl3x9qgpvunrg-mysql.services.clever-cloud.com:3306/bjnbjumbl3x9qgpvunrg';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'semhas';
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'hassem';


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

