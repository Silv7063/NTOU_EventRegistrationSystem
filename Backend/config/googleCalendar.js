const { google } = require('googleapis');
const dotenv = require('dotenv');
dotenv.config();

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

// 获取授權 URL
const getAuthUrl = () => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/calendar'],
    });
    return authUrl;
};

// 使用授權碼獲取訪問令牌
const getAccessToken = async (code) => {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    return tokens;
};

// 創建活動
const createEvent = async (eventData) => {
    const res = await calendar.events.insert({
        calendarId: 'primary',
        resource: eventData,
    });
    return res.data;
};

module.exports = { getAuthUrl, getAccessToken, createEvent };
