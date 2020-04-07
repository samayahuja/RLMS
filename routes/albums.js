var express = require("express");
var router = express.Router();
var Album = require("../models/album");
var middleware = require("../middleware");

//index route
router.get("/", function(req, res){
    // Get all albums from DB
    Album.find({}, function(err, allAlbums){
       if(err){
           console.log(err);
		   req.flash("error","Couldn't retreive from database");
       } else {
          res.render("album/index",{albums: allAlbums, page: 'albums'});
       }
    });
});

//create route
router.post("/", middleware.isLoggedIn,function(req, res){
	var name = req.body.name;
	var artist = req.body.artist;
	var price = req.body.price;
	var imgurl = req.body.imgurl;
	var des = req.body.des;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newAlbum = {name: name, artist: artist, price: price, image: imgurl, description:des, author: author};
	Album.create(newAlbum, function (err, newlycreatedalbum) {
		if (err) {
			req.flash("error","Couldn't create Album");
		} else {
			req.flash("success","Album Added Successfully!!");
			res.redirect("/albums");
		}
	});
});

//new route
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("album/new");
});

//show route
router.get("/:id",function(req, res){
	Album.findById(req.params.id).populate("comments").exec(function (err, foundalbum) {
		if (err || !foundalbum) {
			req.flash("error","Couldn't find Album");
			res.redirect("back");
		} else {
			res.render("album/show", {album:foundalbum});
		}
	});
});

//edit route
router.get("/:id/edit", middleware.isAuthorized,function(req, res){
	Album.findById(req.params.id, function (err, foundalbum) {
		if (err) {
			req.flash("error","Couldn't find Album");
		} else {
			res.render("album/edit", {album: foundalbum});
		}
	});
});

//update route
router.put("/:id", middleware.isAuthorized,function(req, res){
	Album.findByIdAndUpdate(req.params.id, req.body.album, function (err, updatedalbum) {
		if (err) {
			req.flash("error","Couldn't find Album");
			res.redirect("/albums");
		} else {
			req.flash("success","Album Updated!");
			res.redirect("/albums/" + req.params.id);
		}
	});
});

//delete route
router.delete("/:id", middleware.isAuthorized, function(req, res){
	Album.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			req.flash("error","Couldn't find Album");
			res.redirect("/albums");
		} else {
			req.flash("success","Album Deleted");
			res.redirect("/albums");
		}
	});
});

//show songs
router.get("/:id/songs",function(req, res){
	Album.findById(req.params.id).populate("comments").exec(function (err, foundalbum) {
		if (err || !foundalbum) {
			req.flash("error","Couldn't find Album");
			res.redirect("back");
		} else {
			res.render("album/songs", {album:foundalbum});
		}
	});
});

module.exports = router;