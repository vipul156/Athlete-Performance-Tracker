const asyncHandler = require('express-async-handler');
const Score = require('../models/Score');
const Test = require('../models/Test');
const Athlete = require('../models/Athlete');

// @desc    Submit a score
// @route   POST /api/scores
// @access  Private (Coach Only)
const addScore = asyncHandler(async (req, res) => {
    const { athlete_id, test_id, value, date } = req.body;

    const score = new Score({
        athlete_id,
        test_id,
        value,
        date: date || Date.now(),
        recorded_by: req.user._id,
    });

    const createdScore = await score.save();
    res.status(201).json(createdScore);
});

// @desc    Get scores for an athlete
// @route   GET /api/scores/athlete/:id
// @access  Private
const getAthleteScores = asyncHandler(async (req, res) => {
    const scores = await Score.find({ athlete_id: req.params.id })
        .populate('test_id', 'name unit type')
        .sort({ date: -1 });
    res.json(scores);
});

// @desc    Get Leaderboard
// @route   GET /api/scores/leaderboard
// @access  Private
const getLeaderboard = asyncHandler(async (req, res) => {
    // 1. Get all tests to know the type and unit
    const tests = await Test.find({});

    // Quick lookup map
    const testMap = tests.reduce((acc, t) => {
        acc[t._id.toString()] = t;
        return acc;
    }, {});

    // 2. Get all scores populated with athlete
    const scores = await Score.find({})
        .populate('athlete_id', 'name');

    // 3. Process data
    const leaderboardMap = {};

    // Helper: Normalize Score (0-100)
    const calculatePoints = (val, test) => {
        let points = 0;
        const { min_standard, max_standard, type } = test;
        const min = min_standard || 0;
        const max = max_standard || 100;

        if (type === 'higher_is_better') {
            points = ((val - min) / (max - min)) * 100;
        } else {
            // lower is better
            points = ((max - val) / (max - min)) * 100;
        }
        return Math.max(0, Math.min(100, points)); // Clamp
    };

    scores.forEach(score => {
        const athleteId = score.athlete_id._id.toString();
        const testId = score.test_id.toString();
        const testDef = testMap[testId];

        if (!testDef) return;

        const val = score.value;

        if (!leaderboardMap[athleteId]) {
            leaderboardMap[athleteId] = {
                athlete: score.athlete_id,
                scores: {},
                points: {},
                totalPoints: 0
            };
        }

        const entry = leaderboardMap[athleteId];

        // Ensure we only keep the BEST score for each test
        let isNewBest = false;
        if (!entry.scores[testId]) {
            isNewBest = true;
        } else {
            const currentBest = entry.scores[testId];
            if (testDef.type === 'higher_is_better') {
                if (val > currentBest) isNewBest = true;
            } else {
                if (val < currentBest) isNewBest = true;
            }
        }

        if (isNewBest) {
            entry.scores[testId] = val;
            entry.points[testId] = calculatePoints(val, testDef);
        }
    });

    // 4. Calculate Totals & Badges
    const leaderboardArray = Object.values(leaderboardMap).map(entry => {
        let sum = 0;
        let count = 0;
        Object.values(entry.points).forEach(p => {
            sum += p;
            count++;
        });

        entry.totalPoints = Math.round(sum);
        entry.averagePoints = count > 0 ? Math.round(sum / count) : 0;

        // Gamification
        const badges = [];
        if (entry.averagePoints >= 90) badges.push({ label: 'Elite', color: 'bg-yellow-500' });
        else if (entry.averagePoints >= 75) badges.push({ label: 'Pro', color: 'bg-slate-400' });
        else if (entry.averagePoints >= 50) badges.push({ label: 'Rookie', color: 'bg-orange-400' });

        if (entry.totalPoints > 300) badges.push({ label: 'Iron Athlete', color: 'bg-red-600' });

        entry.badges = badges;
        return entry;
    });

    // Sort by Total Points
    leaderboardArray.sort((a, b) => b.totalPoints - a.totalPoints);

    res.json(leaderboardArray);
});

module.exports = { addScore, getAthleteScores, getLeaderboard };
