// middleware/roleMiddleware.js
function checkRole(allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }
        if (allowedRoles.includes(req.user.role)) {
            next(); // 使用者角色符合，繼續執行後續的路由處理
        } else {
            res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }
    };
}

module.exports = checkRole;
