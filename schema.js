var mongoose = require('mongoose');

var videoSchema =  mongoose.Schema({
    title: String,
    description: String,
    youtubeID: String,
    slug: String
});

var courseSchema = mongoose.Schema({
    title: String,
    description: String,
    videos: [videoSchema],
    icon: String,
    level: String,
    slug: String,
    youtubeID: String,
    position: Number
});

var Course = mongoose.model("Course", courseSchema);

module.exports = { Course };
