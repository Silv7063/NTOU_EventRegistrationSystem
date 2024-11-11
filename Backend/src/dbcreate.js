const mongoose = require('mongoose');
const event = require('.//models/Event.js');

const targetEvent = event({
    活動名稱: 'test 1',
    舉辦單位: '我家',
    時間: Date.now(),
    地點: '你媽家',
    標籤: ['a', 'cc'],
    預計人數: 69
});

const targetUser = event({

});

const targetParticipant = event({

});

async function main_run(){
    await mongoose.connect('mongodb+srv://ssw:HQ8wpHDIgOlywFu1@cluster0.gr44f.mongodb.net/NTOU_SE')
        .then(() => console.log("Connected to MongoDB"))
        .catch(err => console.error("Could not connect to MongoDB", err));
    conn = mongoose.connection;

    try{
        targetEvent.save();
        console.log('insert event successfully');
    }catch(err){
        console.log('cannot insert event');
        console.log(err);
    }

}

main_run(); 