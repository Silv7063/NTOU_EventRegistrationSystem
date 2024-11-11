// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    registeredEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    attendedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'events' }],
    registeredAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Participant', participantSchema);