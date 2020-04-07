var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/",function(req, res){
	res.render("landing");
});

// show register form
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

//handle sign up logic
router.post("/register", function (req, res) {
	User.register(new User({username:req.body.username}), req.body.password, function (err, user) {
		if(err){
 			console.log(err);
            return res.render("register", {error: err.message});
		}
		passport.authenticate("local")(req, res, function () {
			req.flash("success","Sign Up Successfull! Welcome to Dark Souls " + user.username + "!!");
			res.redirect("/albums");
		});
	});
});

//show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

//handling login logic
router.post("/login", passport.authenticate("local", {
		 successRedirect: "/albums",
		 failureRedirect: "/login"
	}), function (req, res) {
});

//logout route
router.get("/logout", function (req, res) {
	req.logout();
	req.flash("success", "Sign Out Successful! See You Soon!!");
	res.redirect("/albums");
});

module.exports = router;