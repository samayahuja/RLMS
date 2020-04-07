var mongoose = require("mongoose");
var Album = require("./models/album");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "2001", 
        image: "https://images-na.ssl-images-amazon.com/images/I/61pIGUEHeSL._AC_SX355_.jpg",
        description: "2001 is the second studio album by rapper and hip hop producer Dr. Dre. It was released on November 16, 1999, by Aftermath Entertainment as the follow-up to his 1992 debut album The Chronic"
    }
]
 
function seedDB(){
   //Remove all Albums
   Album.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed Albums!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few Albums
            data.forEach(function(seed){
                Album.create(seed, function(err, Album){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a Album");
                        //create a comment
                        Comment.create(
                            {
                                text: "This Album is great.",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    Album.comments.push(comment);
                                    Album.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;