var mongoose = require('mongoose');

var videoSchema =  mongoose.Schema({
   title: String,
    description: String,
    youtubeID: String,
    order: Number
});

var courseSchema = mongoose.Schema({
   title: String,
    description: String,
    videos: [videoSchema],
    order: Number
});

var Course = mongoose.model("Course", courseSchema);

module.exports = { Course };