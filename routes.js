var express = require("express");
var slug = require('limax');
var { Course } = require('./schema');
var router = express.Router();

router.get("/", (req, res) => {
   Course.find({}, null, { sort: { position: 1 }}, (err, courses) => {
      res.status(err ? 500 : 200).json(err ? err : courses);
   });
});
router.post("/", (req, res) => { 
   Course.create({...req.body, slug: slug(req.body.title)}, (err, doc) => {
       res.status(err ? 500 : 200).json(err ? err : doc);
   });
});

router.post("/:courseID", (req, res) => {
    Course.findByIdAndUpdate(req.params.courseID, {$set: {...req.body, slug: slug(req.body.title)}}, (err, doc) => {
        res.status(err ? 500 : 200).json(err ? err : doc);
    });
});

router.post("/:courseID/new-video", (req, res) => {
    Course.findByIdAndUpdate(req.params.courseID, {$push: {videos: {...req.body, slug: slug(req.body.title)}}}, (err, doc) => {
        res.status(err ? 500 : 200).json(err ? err : doc);
    });
});

router.post("/:courseID/:videoID", (req, res) => {
    Course.findOneAndUpdate({_id: req.params.courseID, 'videos._id': req.params.videoID}, {'videos.$': {$set: {...req.body, slug: slug(req.body.title)}}}, (err, doc) => {
        res.status(err ? 500 : 200).json(err ? err : doc);
    });
});

router.delete("/:courseID", (req, res) => {
   Course.findByIdAndDelete(req.params.courseID, (err, doc) => {
       res.status(err ? 500 : 200).json(err ? err : doc);
   });
});

router.delete("/:courseID/:videoID", (req, res) => {
   Course.findByIdAndUpdate(req.params.courseID, {$pull: {videos: {_id: req.params.videoID}}}, (err, doc) => {
       res.status(err ? 500 : 200).json(err ? err : doc);
   });
});

module.exports = router;
