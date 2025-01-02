const Event = require('../models/Event');
const Registration = require('../models/Registration');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// 創建活動
exports.createEvent = async (req, res) => {
  
  const { title, description, date, participantLimit, creator, location} = req;
  try {
    const eventDate = new Date(new Date(date).getTime() - (new Date(date).getTimezoneOffset() * 60000));
    //console.log("update");
    const newEvent = new Event({ title, description, date:eventDate, participantLimit, state:"upcoming", creator, location, createdAt:Date.now()  });
    await newEvent.save();
    //console.log("save");
    return newEvent; // 返回創建的活動資料
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// 查詢所有活動
exports.getEvents = async () => {
  try {
    const events = await Event.find();
    if (!events || events.length === 0) {
      throw new Error('No events found');
    }
    return events;
  } catch (error) {
    console.error('Error fetching events:', error.message);
    throw new Error('Failed to retrieve events');
  }
};

// 報名活動
exports.registerForEvent = async (eventId, user) => {
  const userId = user._id;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return { msg: 'Event not found' };
    }

    // 檢查活動是否已滿
    if (event.participants.length >= event.participantLimit) {
      return { msg: 'Event is full' };
    }

    // 檢查用戶是否已報名過
    const existingRegistration = await Registration.findOne({ user: userId, event: eventId });
    if (existingRegistration) {
      return { msg: 'Already registered for this event' };
    }

    const registration = new Registration({
      user: userId,
      event: eventId,
      state: "registered"
    });

    await registration.save();
    event.participants.push(userId);
    await event.save();

    return { msg: 'Successfully registered for the event' };
  } catch (err) {
    console.error(err.message);
    return { msg: 'Server error' };
  }
};

exports.cancelRegistrationForEvent = async (eventId, user) => {
  const userId = user._id;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return { msg: 'Event not found' };
    }

    // 檢查用戶是否已報名過
    const existingRegistration = await Registration.findOne({ user: userId, event: eventId });
    if (!existingRegistration) {
      return { msg: 'User is not registered for this event' };
    }

    // 刪除註冊紀錄
    await Registration.findOneAndDelete({ user: userId, event: eventId });

    // 從活動中移除用戶
    event.participants = event.participants.filter(participantId => participantId.toString() !== userId.toString());
    await event.save();

    return { msg: 'Successfully cancelled the registration for the event' };
  } catch (err) {
    console.error(err.message);
    return { msg: 'Server error' };
  }
};

// 查看活動詳情
exports.getEventDetails = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return { msg: 'Event not found' };
    }

    return event;
  } catch (err) {
    console.error(err.message);
    return { msg: 'Server error' };
  }
};

// 更新活動
exports.updateEvent = async (eventId, eventData) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(eventId, eventData, { new: true });
    if (!updatedEvent) {
      return { msg: 'Event not found' };
    }

    return updatedEvent;
  } catch (err) {
    console.error(err.message);
    return { msg: 'Server error' };
  }
};

// 刪除活動
exports.deleteEvent = async (eventId) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return { msg: 'Event not found' };
    }

    return { msg: 'Event deleted successfully' };
  } catch (err) {
    console.error(err.message);
    return { msg: 'Server error' };
  }
};
//瀏覽活動
exports.queryEvents = async (keyword) => {
  try {
    const regex = new RegExp(keyword, 'i'); // 不區分大小寫的關鍵字
    const events = await Event.find({
      $or: [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
      ],
    });

    if (!events || events.length === 0) {
      return { msg: 'No events found matching the keyword' };
    }

    return events;
  } catch (err) {
    console.error('Error querying events:', err.message);
    throw new Error('Failed to query events');
  }
};