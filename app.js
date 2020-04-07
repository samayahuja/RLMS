var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var flash = require("connect-flash");
var Album = require("./models/album");
var Comment = require("./models/comment");
var User = require("./models/user");
var commentsRoute = require("./routes/comments");
var AlbumsRoute = require("./routes/albums");
var indexRoute = require("./routes/index");
var seedDb = require("./seeds");

// seedDb();

var app = express();

mongoose.connect("mongodb://localhost/rlms");

app.set("view engine","ejs");

app.locals.moment = require("moment");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(require("express-session")({
	secret: "Record Label",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(flash());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error= req.flash("error");
	res.locals.success= req.flash("success");
	next();
});

app.use("/", indexRoute);
app.use("/Albums", AlbumsRoute);
app.use("/Albums/:id/comments", commentsRoute);

app.listen(3000, function () {
	console.log("Record Label Server Has Started!!");
});
