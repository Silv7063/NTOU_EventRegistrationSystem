const express = require('express');
const checkRole = require('../middleware/roleMiddleware');
const Event = require('../models/Event');
const router = express.Router();

// 僅進階使用者和管理員可創建活動
router.post('/events', checkRole(['advancedUser', 'admin']), async (req, res) => {
    try {
        const event = new Event({ ...req.body, createdBy: req.user.userId });
        await event.save();
        res.status(201).send(event);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/events/:id/register', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event.participantRoles.includes(req.user.role)) {
            return res.status(403).send('Role not allowed for this event');
        }
        event.attendees.push(req.user.userId);
        await event.save();
        res.send('Registered successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
