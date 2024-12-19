// backend/utils/validators.js

// 驗證電子郵件格式
const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        return "無效的電子郵件格式";
    }
    return null;
};

// 驗證密碼強度（至少8個字符，包含大寫、小寫、數字和特殊字符）
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return "密碼必須包含至少8個字符、大寫字母、小寫字母、數字和特殊字符";
    }
    return null;
};

// 驗證活動時間是否合理（結束時間晚於開始時間）
const validateEventTimes = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return "日期格式無效";
    }

    if (start >= end) {
        return "結束時間必須晚於開始時間";
    }
    return null;
};

// 驗證活動名是否有效（不應該為空）
const validateEventName = (eventName) => {
    if (!eventName || eventName.trim().length === 0) {
        return "活動名稱不可為空";
    }
    return null;
};

module.exports = {
    validateEmail,
    validatePassword,
    validateEventTimes,
    validateEventName
};
