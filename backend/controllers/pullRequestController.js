const PullRequest = require("../models/PullRequests");
const User = require("../models/User");

// Create a new pull request
exports.createPullRequest = async (req, res) => {
  try {
    const { title, description, approvers } = req.body;
    const pullRequest = new PullRequest({
      title,
      description,
      requesterId: req.user._id,
      approvers,
    });

    await pullRequest.save();
    res.status(201).json(pullRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all pull requests
exports.getAllPullRequests = async (req, res) => {
  try {
    const pullRequests = await PullRequest.find();
    res.status(200).json(pullRequests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific pull request by ID
exports.getPullRequestById = async (req, res) => {
  try {
    const pullRequest = await PullRequest.findById(req.params.id).populate(
      "approvers.approverId"
    );
    if (!pullRequest)
      return res.status(404).json({ message: "Pull Request not found" });
    res.status(200).json(pullRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a pull request
exports.updatePullRequest = async (req, res) => {
  try {
    const updatedPullRequest = await PullRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPullRequest)
      return res.status(404).json({ message: "Pull Request not found" });
    res.status(200).json(updatedPullRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a pull request
exports.deletePullRequest = async (req, res) => {
  try {
    const pullRequest = await PullRequest.findByIdAndDelete(req.params.id);
    if (!pullRequest)
      return res.status(404).json({ message: "Pull Request not found" });
    res.status(200).json({ message: "Pull Request deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
