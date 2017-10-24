// import modules
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var configPassport = require("./config/passport");
var flash = require("connect-flash");
var path = require("path");
var routes = require("./controllers/routes");
var authRoutes = require("./controllers/authroutes");
var database = require("./config/database");

// connect to db
database.startDb();

// set up middleware

// static serving
app.use(express.static("public"));

// set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set up body parser
app.use(bodyParser.urlencoded({ extended: true }));

// set up sessions
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
  })
);

app.use(flash());
app.use((req, res, next) => {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

// set up passport middleware
configPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use((req, res, next) => {
  res.locals.user = req.user;
  console.log("User: " + req.user);
  next();
});

app.use("/students", routes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.redirect("/auth");
});

// set up error middleware
app.use(function(req, res, next) {
  res.statusCode = 404;
  res.end("Page doesn't exist");
});

// start server
app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
