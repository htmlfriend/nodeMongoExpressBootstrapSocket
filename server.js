const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.Promise = Promise;
const dbUrl = '';

mongoose.connect(
  dbUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log('mongo db connectin', err);
  }
);

let Message = mongoose.model('Message', {
  name: String,
  message: String,
});

app.get('/messages', async (req, res) => {
  let messages = await Message.find({}, (err, data) => {
    return data;
  });
  res.send(messages);
});

app.post('/messages', async (req, res) => {
  try {
    let message = new Message(req.body);
    await message.save();
    console.log('saved');
    let sensored = await Message.findOne({ message: 'badword' });
    if (sensored) {
      console.log('censored words found and deleter', sensored);
      await Message.deleteOne({ _id: sensored.id });
    } else {
      io.emit('message', massege);
      res.sendStatus(200);
    }
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  } finally {
    console.log('message post called');
  }
});

app.get('/messages/:user', async (req, res) => {
  var user = req.params.user;
  let messages = await Message.find({ name: user }, (err, data) => {
    return data;
  });
  res.send(messages);
});

io.on('connection', (socket) => {
  console.log('User connected');
});

http.listen(3000, () => {
  console.log('I am running on 3000');
});
