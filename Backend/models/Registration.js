const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    registrationDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['registered', 'cancelled', 'attended'],
        default: 'registered',
    },
    isWaitlisted: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Registration', registrationSchema);
