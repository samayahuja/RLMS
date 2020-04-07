var mongoose = require("mongoose");
 
var albumSchema = new mongoose.Schema({
   name: String,
   artist: String,
   price: String,
   image: String,
   description: String,
   song1: String,
   song1prize: String,
   song2: String,
   song2prize: String,
   song3: String,
   song3prize: String,
   song4: String,
   song4prize: String,
   song5: String,
   song5prize: String,
   song6: String,
   song6prize: String,
   song7: String,
   song7prize: String,
   song8: String,
   song8prize: String,
   song9: String,
   song9prize: String,
   song10: String,
   song10prize: String,
   song11: String,
   song11prize: String,
   song12: String,
   song12prize: String,
   song13: String,
   song13prize: String,
   song14: String,
   song14prize: String,
   song15: String,
   song15prize: String,
   song16: String,
   song16prize: String,	
   song17: String,
   song17prize: String,
   song18: String,
   song18prize: String,
   song19: String,
   song19prize: String,
   song20: String,
   song20prize: String,
   song21: String,
   song21prize: String,
   song22: String,
   song22prize: String,
   song23: String,
   song23prize: String,
   song24: String,
   song24prize: String,
   song25: String,
   song25prize: String,
   createdAt: {type: Date, default: Date.now},
   author: {
	   id: {
		   type: mongoose.Schema.Types.ObjectId,
		   ref: "User"
	   },
	   username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});
 
module.exports = mongoose.model("Album", albumSchema);