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

    state: {
        type: String,
        enum: ['registered', 'cancelled', 'attended'],
        default: 'registered',
    }
});

module.exports = mongoose.model('registration', registrationSchema);
