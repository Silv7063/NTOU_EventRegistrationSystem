// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    date: { type: Date, required: true },
    location: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    participantRoles: [{ type: String, enum: ['student', 'teacher', 'staff'] }], // 參與者身分限制
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Event', eventSchema);
