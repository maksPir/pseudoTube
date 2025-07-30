const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const telegramRouter = require('../routes/telegram.routes');
const userRouter = require('../routes/user.routes');
const filmRouter = require('../routes/film.routes');
const commentRouter = require('../routes/comment.routes');
//const errorMiddleware = require('../middlewares/error-middleware');
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  if (msg.text === 'Hello') {
    bot.sendMessage(chatId, `Hello, ${msg.from.first_name}`, {
      reply_markup: {
        keyboard: [['Начать игру'], ['Завершить игру']],
      },
    });
  }

  if (msg.text === 'location') {
    bot.sendLocation(chatId, 53.226935, 50.191408);
    bot.sendMessage(chatId, 'Иди сюда');
  }

  if (msg.text === '/photo') {
    bot.sendPhoto(chatId, 'https://content2.flowwow-images.com/data/blog/17/1706686016_8859517.jpg', {
      caption: 'Sickly Sweet Bot',
    });
  }
});

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: '*',
  })
);
app.use('/api', telegramRouter);
app.use('/api', userRouter);
app.use('/api', filmRouter);
app.use('/api', commentRouter);
//app.use(errorMiddleware);
const PORT = process.env.PORT || 5001;
const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e.message);
  }
};
start();
module.exports = app;
