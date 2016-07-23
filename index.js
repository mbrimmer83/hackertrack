var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//Mongo database
mongoose.connect('mongodb://localhost/bookmarks');
var Bookmark = require('./bookmarkmodel');
var app = express();
app.use(bodyParser.json());

//Request for bookmarks sends to client
app.get('/bookmark', function(req, res) {
  var userInfo = req.query;
  var id = userInfo.id;
  Bookmark.findOne({ _id: id}, function (err, bookmarks) {
    if (err) {
      console.log(err.message);
      return;
    }
    res.json({bookmarks: bookmarks.bookmarks});
  });
});

//Updates bookmarks with changes from client
app.post('/bookmark', function(req, res) {
  var userInfo = req.body;
  Bookmark.findOne({ _id: userInfo._id}, function(err, theBookmarks) {
    if (!theBookmarks) {
      console.log("Bookmarks not found!");
      return;
    }
    console.log(userInfo.bookmark);
    theBookmarks.bookmarks.push(userInfo.bookmark);
    theBookmarks.save(function(err, reply) {
      if (err) {
        res.json({ status: "Fail", error: err.message });
        console.log(err.message);
        return;
      }
      console.log('Updated succeeded', reply);
      res.json({
        status:"OK"
      });
    });
  });
});

app.listen(3000, function() {
  console.log('Listening on port 3000!');
});
