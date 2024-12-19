// backend/utils/emailTemplates.js
const ejs = require('ejs');

// 活動報名確認模板
const registrationConfirmation = (userName, eventName, eventDate) => {
    return ejs.render(`
        <p>親愛的 <%= userName %>，</p>
        <p>您已成功報名參加活動 <strong><%= eventName %></strong>，活動將於 <strong><%= eventDate %></strong> 舉行。</p>
        <p>感謝您的參與！</p>
        <p>如果您有任何問題，請隨時與我們聯繫。</p>
    `, { userName, eventName, eventDate });
};

// 活動時間修改通知
const eventTimeChangeNotification = (userName, eventName, newEventDate) => {
    return ejs.render(`
        <p>親愛的 <%= userName %>，</p>
        <p>我們要通知您，活動 <strong><%= eventName %></strong> 的時間已經更改，新的活動時間為 <strong><%= newEventDate %></strong>。</p>
        <p>我們為此帶來的不便深感抱歉，並感謝您的理解。</p>
    `, { userName, eventName, newEventDate });
};

// 活動報名取消通知
const registrationCancellation = (userName, eventName) => {
    return ejs.render(`
        <p>親愛的 <%= userName %>，</p>
        <p>很遺憾地通知您，您報名參加的活動 <strong><%= eventName %></strong> 已經被取消。</p>
        <p>如果您有任何疑問，請隨時與我們聯繫。</p>
    `, { userName, eventName });
};

module.exports = {
    registrationConfirmation,
    eventTimeChangeNotification,
    registrationCancellation
};
