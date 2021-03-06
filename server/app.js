const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const logger = require("morgan");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const db = require("./db");
const { User } = require("./db/models");
// create store for sessions to persist in database
const sessionStore = new SequelizeStore({ db });


const { json, urlencoded } = express;

const app = express();
io = require('socket.io')();


app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(join(__dirname, "public")));
io.use(async function(socket, next){
  const token = socket.handshake.query.token
  const verifiedUser = await verify(token) 
  const userId = verifiedUser && verifiedUser['dataValues'].id;
  require('./sockets')(io,userId);
  return next();
})


app.use(async function (req, res, next) {
  const token = req.headers["x-access-token"];
  const verifiedUser = token && await verify(token);
  if (verifiedUser) req.user = verifiedUser;
  return next();
});

// require api routes here after I create them
app.use("/auth", require("./routes/auth"));
app.use("/api", require("./routes/api"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});


//verify jwt
const verify = async (token) => jwt.verify(token, process.env.SESSION_SECRET, async (err, decoded) => {
      if (err) {
        return null;
      }
      const user = await User.findOne({
        where: { id: decoded.id },
      })
      return user;
    });

module.exports = { app, sessionStore,io };
