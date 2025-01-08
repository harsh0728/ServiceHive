const express = require('express');
const { addApproval, getApprovals } = require('../controllers/approvalController');
const authenticateJWT = require('../middleware/authenticateJWT');

const router = express.Router();

router.post('/:id/approvals', authenticateJWT, addApproval);
router.get('/:id/approvals', authenticateJWT, getApprovals);

module.exports = router;
