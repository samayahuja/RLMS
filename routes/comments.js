var express = require("express");
var router = express.Router({mergeParams: true});
var Album = require("../models/album");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
	Album.findById(req.params.id, function (err, album) {
		if (err || !album) {
			req.flash("error","Something Went Wrong");
			res.redirect("back");
		} else {
			res.render("comments/new", {album:album});
		}
	});
});

//Comments Create
router.post("/", middleware.isLoggedIn, function(req, res){
	Album.findById(req.params.id, function (err, album) {
		if (err || !album) {
			req.flash("error","Something WEnt Wrong");
			res.redirect("back");
		} else {
			Comment.create(req.body.comment, function (err, comment) {
				if (err) {
					req.flash("error","Couldn't create Comment");
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					album.comments.push(comment);
					album.save();
					req.flash("success","Comment added Successfully!!");
					res.redirect("/albums/" + album._id);
				}
			});
		}
	});
});

//Comments Edit
router.get("/:comment_id/edit", middleware.isUserAuthorized, function(req, res){
	Album.findById(req.params.id, function (err, foundAlbum) {
		if (err || !foundAlbum) {
			req.flash("error","Couldn't find Album");
			return res.redirect("back");
		} else {
			Comment.findById(req.params.comment_id, function (err, foundComment) {
				if (err) {
					req.flash("error","Couldn't find Comment");
					res.redirect("back");
				} else {
					res.render("comments/edit",{album_id: req.params.id, comment: foundComment});
				}
			});
		}
	});
});

//Comments Update
router.put("/:comment_id", middleware.isUserAuthorized, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
		if (err) {
			req.flash("error","Couldn't find Comment");
			res.redirect("back");
		} else {
			req.flash("success","Comment Updated Successfully!!");
			res.redirect("/albums/" + req.params.id);
		}
	});
});

//Comment Delete
router.delete("/:comment_id", middleware.isUserAuthorized,function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function (err) {
		if (err) {
			req.flash("error","Couldn't find Comment");
			res.redirect("back");
		} else {
			req.flash("success","Comment deleted Successfully!!");
			res.redirect("/albums/" + req.params.id);
		}
	});
});

module.exports = router;