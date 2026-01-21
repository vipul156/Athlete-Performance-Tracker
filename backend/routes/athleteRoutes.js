const express = require('express');
const router = express.Router();
const {
    getAthletes,
    getAthleteById,
    createAthlete,
    updateAthlete,
    deleteAthlete,
} = require('../controllers/athleteController');
const { protect, coach } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getAthletes)
    .post(protect, coach, createAthlete);

router.route('/:id')
    .get(protect, getAthleteById)
    .put(protect, coach, updateAthlete)
    .delete(protect, coach, deleteAthlete);

module.exports = router;
