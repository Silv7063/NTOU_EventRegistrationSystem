const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const { authorizeRole } = require('../middlewares/roleMiddleware');
const participantsController = require('../controllers/participantsController');

//使用者獲取user的所有活動 
router.get('/getEvent', authMiddleware, async (req, res) => {
  try {
    //console.log("getEvent", req.user)
    const data = await participantsController.getUserEvents(req);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve user profile', error: error.message });
  }
});

router.delete('/:participantId', authMiddleware, async (req, res) => {
  try {
    const participantId = req.params.participantId; // 提取參數中的 participantId
    await participantsController.deleteParticipant(participantId);
    res.status(200).json({ message: '成功刪除報名記錄' });
  } catch (error) {
    res.status(500).json({ message: '刪除報名記錄失敗', error: error.message });
  }
});


module.exports = router;