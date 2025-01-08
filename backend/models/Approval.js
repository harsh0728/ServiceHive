const mongoose = require("mongoose");

const ApprovalsSchema = new mongoose.Schema({
    approvalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  pullRequestId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PullRequests",
    required: true,
  },
  approverId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status :{enum:[ "Pending", "Approved", "Rejected"]},
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Approvals", ApprovalsSchema);
