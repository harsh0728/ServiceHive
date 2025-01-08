const Comment = require('../models/Comment');

// Add a comment to a pull request
exports.addComment = async (req, res) => {
  try {
    const { comments } = req.body;
    const newComment = new Comment({
      pullRequestId: req.params.id,
      reviewerId: req.user._id,
      comments,
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all comments for a specific pull request
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ pullRequestId: req.params.id });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
