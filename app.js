import express from "express";
import cors from "cors";
import db from "./models/index.js";
var createError = require("http-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// const { sequelize } = require("./models"); //db.sequelize

var workTimeRouter = require("./routes/workTime");
var registerRouter = require("./routes/register");
var loginRouter = require("./routes/login");
var adminLoginRouter = require("./routes/adminLogin");
var getUserRouter = require("./routes/getUserInfo");
var stateRouter = require("./routes/state");

const app = express();
// const cors = require("cors");
app.use(cors());

// Sync Sequelize models
db.sequelize
  .sync({ force: false })
  // .sync({ force: true })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.set("port", process.env.PORT || 3003);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", workTimeRouter);
app.use("/", stateRouter);
app.use("/user", getUserRouter);
app.use("/user", registerRouter);
app.use("/user", loginRouter);
app.use("/user", adminLoginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(process.env.PORT || 3003, () => {
  console.log("Server is listening on port 3003");
});

module.exports = app;
