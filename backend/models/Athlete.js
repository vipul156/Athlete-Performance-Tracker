const mongoose = require('mongoose');

const athleteSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    height: {
        type: Number, // in cm
        required: true,
    },
    weight: {
        type: Number, // in kg
        required: true,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
}, {
    timestamps: true,
});

const Athlete = mongoose.model('Athlete', athleteSchema);
module.exports = Athlete;
