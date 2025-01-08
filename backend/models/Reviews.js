const mongoose = require("mongoose");

const ReviewsSchema = new mongoose.Schema({
  reviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  pullRequestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PullRequests",
    required: true,
  },
  reviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: {type:String},
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", ReviewsSchema);
