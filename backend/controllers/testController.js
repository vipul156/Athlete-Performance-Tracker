const asyncHandler = require('express-async-handler');
const Test = require('../models/Test');

// @desc    Get all tests
// @route   GET /api/tests
// @access  Private
const getTests = asyncHandler(async (req, res) => {
    const tests = await Test.find({});
    res.json(tests);
});

// @desc    Create a new test definition
// @route   POST /api/tests
// @access  Private (Coach Only)
const createTest = asyncHandler(async (req, res) => {
    const { name, unit, type } = req.body;

    const test = new Test({
        name,
        unit,
        type,
    });

    const createdTest = await test.save();
    res.status(201).json(createdTest);
});

module.exports = { getTests, createTest };
