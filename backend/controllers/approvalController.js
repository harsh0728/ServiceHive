const Approval = require('../models/Approval');

// Add approval decision to a pull request
exports.addApproval = async (req, res) => {
  try {
    const { status } = req.body;
    const approval = new Approval({
      pullRequestId: req.params.id,
      approverId: req.user._id,
      status,
    });

    await approval.save();
    res.status(201).json(approval);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all approvals for a specific pull request
exports.getApprovals = async (req, res) => {
  try {
    const approvals = await Approval.find({ pullRequestId: req.params.id });
    res.status(200).json(approvals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
