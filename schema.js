var mongoose = require('mongoose');

var videoSchema =  mongoose.Schema({
   title: String,
    description: String,
    youtubeID: String
});

var courseSchema = mongoose.Schema({
   title: String,
    description: String,
    videos: [videoSchema]
});

var Course = mongoose.model("Course", courseSchema);

module.exports = { Course };