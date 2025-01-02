const jwt = require('jsonwebtoken');
const Event = require('../models/Event');
const mongoose = require('mongoose');
const Registration = require('../models/Registration');

// 查詢用戶的活動
exports.getUserEvents = async (req) => {
  try {
    const events = await Registration.find({ user: req.user._id });
    if (!events || events.length === 0) {
      throw new Error('No events found for the given user');
    }
    //console.log("evemts", events)
    return events;
  } catch (error) {
    console.error('Error fetching events for user:', error.message);
    throw new Error('Failed to retrieve events for user');
  }
};

exports.deleteParticipant = async (participantId) => {
    try {
      const participant = await Registration.findById(new mongoose.Types.ObjectId(participantId));

      if (!participant) {
        throw new Error('報名記錄不存在');
      }
      
      await Registration.findByIdAndDelete(new mongoose.Types.ObjectId(participantId));
      //await cascadeDeleteEvent(participant.event, participant.participantId);
      return { message: '成功刪除報名記錄' };
    } catch (error) {
      console.error('Error deleting participant:', error.message);
      throw new Error('刪除報名記錄失敗');
    }
  }; 

  const cascadeDeleteEvent = async (eventId, participantId) => {
    console.log(`從活動 ${eventId} 中移除參與者 ${participantId}`);
    try {
      const event = await Event.findById(eventId);
  
      if (!event) {
        throw new Error('活動不存在');
      }
  
      // 從 participants 陣列中移除參與者
      event.participants = event.participants.filter(
        (id) => id.toString() !== participantId.toString()
      );
      

      //await event.save();
      console.log(`參與者 ${participantId} 已從活動 ${eventId} 中移除`);
    } catch (error) {
      console.error('Error in cascadeDeleteEvent:', error.message);
      throw new Error('無法從活動中移除參與者');
    }
  };