const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    name: {type: String, required: true},
    舉辦單位: {type: String, required: true},
    date: Date,
    location: {type: String, maxlength: 255},
    標籤: {type: [String], /*標籤用陣列形式存放多個標籤*/ maxlength: 255}, //之後可以用enum
    預計人數: {type: Number, required: true},
    活動簡介: {type: String, maxlength: 2000}
});

module.exports = mongoose.model('Events', eventSchema);