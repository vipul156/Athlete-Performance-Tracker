const express = require('express');
const router = express.Router();
const { getTests, createTest } = require('../controllers/testController');
const { protect, coach } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getTests)
    .post(protect, coach, createTest);

module.exports = router;
