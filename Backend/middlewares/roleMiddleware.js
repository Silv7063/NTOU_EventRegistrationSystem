// 角色檢查中介層
const authorizeRole = (roles) => {
    return (req, res, next) => {
        // 檢查用戶角色是否在授權的角色列表中
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied. You do not have the required role.' });
        }
        next();
    };
};

module.exports = {authorizeRole};
