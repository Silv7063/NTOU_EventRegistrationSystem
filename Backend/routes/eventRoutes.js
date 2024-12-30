const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { authorizeRole } = require('../middlewares/roleMiddleware');

// 獲取所有活動
router.get('/all', async (req, res) => {
  try {
    const events = await eventController.getEvents(); // 確保這是有效數據
    if (!events || events.length === 0) {  // 檢查 events 是否為空或未定義
      return res.status(404).json({ message: 'No events found' });
    }
    res.json(events); // 返回活動列表
  } catch (error) {
    console.error('Error fetching events:', error.message);
    res.status(500).json({ message: 'Failed to retrieve events', details: error.message });
  }
});

// 獲取單個活動詳細資料
router.get('/get/:eventId', async (req, res) => {
  // console.log(req.params);
  // const { id } = req.params;
  // console.log(id+" : "+req.params.eventId);
  try {
    const event = await eventController.getEventDetails(req.params.eventId);
    console.log(":"+event);
    if (!event || event.msg) {
      return res.status(404).json({ msg: 'Event not found'+" of "+ id});
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});
// 報名參加活動
router.post('/:eventId/register', authMiddleware, async (req, res) => {
  try {
    const registration = await eventController.registerForEvent(req.params.eventId, req.user, req.body);
    res.status(201).json(registration); // 返回報名結果
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error: error.message });
  }
});

// 活動創建
router.post('/', /*authMiddleware, authorizeRole(['admin', 'advanced']), */async (req, res) => {
  try {
    const newEvent = await eventController.createEvent(req.body);
    res.status(201).json(newEvent); // 返回創建的活動資料
  } catch (error) {
    res.status(400).json({ message: 'Failed to create event', error: error.message });
  }
});

// 活動更新
router.put('/:eventId', authMiddleware, authorizeRole(['admin', 'advanced']), async (req, res) => {
  try {
    const updatedEvent = await eventController.updateEvent(req.params.eventId, req.body);
    res.json(updatedEvent); // 返回更新後的活動資料
  } catch (error) {
    res.status(400).json({ message: 'Failed to update event', error: error.message });
  }
});

// 活動刪除
router.delete('/:eventId', authMiddleware, authorizeRole(['admin']), async (req, res) => {
  try {
    await eventController.deleteEvent(req.params.eventId);
    res.status(204).send(); // 刪除成功，無內容返回
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete event', error: error.message });
  }
});

router.get('/search/events', async (req, res) => {
  const { keyword } = req.query;
  console.log(keyword);
  try {
    const events = await eventController.queryEvents(keyword);
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ msg: err.message});
  }
});



module.exports = router;
