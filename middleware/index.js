var Album = require("../models/album");
var Comment = require("../models/comment");
var middlewareObj = {};

//authirization function for albums
middlewareObj.isAuthorized = function (req, res, next) {
	if (req.isAuthenticated()) {
		Album.findById(req.params.id, function (err, foundalbum) {
			if (err || !foundalbum) {
				req.flash("error","Couldn't find Album");
				res.redirect("back");
			} else {
				if (foundalbum.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error","You Don't Have Permission to do that!!");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error","You need to be Signed In to do that!!");
		res.redirect("back");
	}
}

//authirization function for comments
middlewareObj.isUserAuthorized = function (req, res, next) {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function (err, foundcomment) {
			if (err || !foundcomment) {
				req.flash("error","Couldn't find Comment");
				res.redirect("back");
			} else {
				if (foundcomment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error","You don't have permission to do that!!");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error","You need to be Signed In to do that!!");
		res.redirect("back");
	}
}

//function for checking user login
middlewareObj.isLoggedIn = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash("error","You need to be Signed In to do that!!");
	res.redirect("/login");
}

module.exports = middlewareObj;