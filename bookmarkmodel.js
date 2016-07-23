var mongoose = require('mongoose');

var Bookmark = mongoose.model('Bookmark', {
  _id: String,
  bookmarks: []
});

module.exports = Bookmark;
