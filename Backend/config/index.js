const connectDB = require('./db');
const transporter = require('./mailer');
const calendar = require('./googleCalendar');

module.exports = {
    connectDB,
    transporter,
    calendar,
};
