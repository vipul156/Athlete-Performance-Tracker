const express = require('express');
const router = express.Router();
const { addScore, getAthleteScores, getLeaderboard } = require('../controllers/scoreController');
const { protect, coach } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, coach, addScore);

router.route('/athlete/:id')
    .get(protect, getAthleteScores);

router.route('/leaderboard')
    .get(protect, getLeaderboard);

module.exports = router;
