const asyncHandler = require('express-async-handler');
const Athlete = require('../models/Athlete');

// @desc    Get all athletes
// @route   GET /api/athletes
// @access  Private (Coach/Viewer)
const getAthletes = asyncHandler(async (req, res) => {
    const athletes = await Athlete.find({}).populate('created_by', 'name');
    res.json(athletes);
});

// @desc    Get single athlete
// @route   GET /api/athletes/:id
// @access  Private
const getAthleteById = asyncHandler(async (req, res) => {
    const athlete = await Athlete.findById(req.params.id);

    if (athlete) {
        res.json(athlete);
    } else {
        res.status(404);
        throw new Error('Athlete not found');
    }
});

// @desc    Create a new athlete
// @route   POST /api/athletes
// @access  Private (Coach Only)
const createAthlete = asyncHandler(async (req, res) => {
    const { name, dob, height, weight } = req.body;

    const athlete = new Athlete({
        name,
        dob,
        height,
        weight,
        created_by: req.user._id,
    });

    const createdAthlete = await athlete.save();
    res.status(201).json(createdAthlete);
});

// @desc    Update athlete profile
// @route   PUT /api/athletes/:id
// @access  Private (Coach Only)
const updateAthlete = asyncHandler(async (req, res) => {
    const { name, dob, height, weight } = req.body;

    const athlete = await Athlete.findById(req.params.id);

    if (athlete) {
        athlete.name = name || athlete.name;
        athlete.dob = dob || athlete.dob;
        athlete.height = height || athlete.height;
        athlete.weight = weight || athlete.weight;

        const updatedAthlete = await athlete.save();
        res.json(updatedAthlete);
    } else {
        res.status(404);
        throw new Error('Athlete not found');
    }
});

// @desc    Delete athlete
// @route   DELETE /api/athletes/:id
// @access  Private (Coach Only)
const deleteAthlete = asyncHandler(async (req, res) => {
    const athlete = await Athlete.findById(req.params.id);

    if (athlete) {
        await athlete.deleteOne();
        res.json({ message: 'Athlete removed' });
    } else {
        res.status(404);
        throw new Error('Athlete not found');
    }
});

module.exports = {
    getAthletes,
    getAthleteById,
    createAthlete,
    updateAthlete,
    deleteAthlete,
};
