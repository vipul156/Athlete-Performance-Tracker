const mongoose = require('mongoose');

const scoreSchema = mongoose.Schema({
    athlete_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Athlete',
        required: true,
    },
    test_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test',
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    recorded_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

const Score = mongoose.model('Score', scoreSchema);
module.exports = Score;
