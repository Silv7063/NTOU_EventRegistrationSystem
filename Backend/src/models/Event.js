// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    date: { type: Date, required: true },
    location: String
});

module.exports = mongoose.model('Event', eventSchema);
