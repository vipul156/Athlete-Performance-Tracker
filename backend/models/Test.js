const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['lower_is_better', 'higher_is_better'],
        required: true,
    },
    min_standard: {
        type: Number, // Value for 0 points
        default: 0
    },
    max_standard: {
        type: Number, // Value for 100 points (or 0 points for lower_is_better reversed logic? No, let's keep it simple: range boundaries)
        required: true,
    }
}, {
    timestamps: true,
});

const Test = mongoose.model('Test', testSchema);
module.exports = Test;
