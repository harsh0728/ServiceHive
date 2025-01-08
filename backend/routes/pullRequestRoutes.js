// const express = require("express");
// const { createPullRequest, getPullRequests,getPullRequestById, updatePullRequest,deletePullRequest } = require("../controllers/pullRequestController");
// const { authenticateJWT } = require("../middleware/authenticateJWT");

// const router = express.Router();

// router.route("/").get(authenticateJWT, getPullRequests).post(authenticateJWT, createPullRequest);
// router.route("/:id").put(authenticateJWT, updatePullRequest);
// router.route("/:id").get(authenticateJWT, getPullRequestById);
// router.route("/:id").delete(authenticateJWT,deletePullRequest);

// module.exports = router;


const express = require('express');
const { createPullRequest, getAllPullRequests, getPullRequestById, updatePullRequest, deletePullRequest } = require('../controllers/pullRequestController');
const authenticateJWT = require('../middleware/authenticateJWT');
const authorizeRole = require('../middleware/authorizeRole');

const router = express.Router();

router.get('/', authenticateJWT, getAllPullRequests);
router.get('/:id', authenticateJWT, getPullRequestById);
router.post('/', authenticateJWT, authorizeRole(['Admin', 'Developer']), createPullRequest);
router.put('/:id', authenticateJWT, authorizeRole(['Admin', 'Developer']), updatePullRequest);
router.delete('/:id', authenticateJWT, authorizeRole(['Admin']), deletePullRequest);

module.exports = router;
