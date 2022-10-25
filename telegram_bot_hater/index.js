const TelegramApi = require('node-telegram-bot-api');
const { data: list, botApiLink } = require('./db');

const botLink = 't.me/HaterNicolaevSpecialBot';

const bot = new TelegramApi(botApiLink, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if (text === '/start') {
    await bot.sendSticker(
      chatId,
      'https://tlgrm.eu/_/stickers/1b5/0ab/1b50abf8-8451-40ca-be37-ffd7aa74ec4d/256/46.webp',
    );
    await bot.sendMessage(
      chatId,
      'Добро пожаловать в замечательный телеграм бот, который сможет поднять вам настроение, зарядить энергией или нет))',
    );
  }
  if (text.at(0) === '/' && text !== '/start') {
    await bot.sendMessage(
      chatId,
      'Дорогой пользователь, в этом чате нет команд, кроме /start, так что наслаждайся общением с роботом))',
    );
  }
  if (text.at(0) !== '/' && text !== '/start') {
    const randomNum = Math.round(Math.random() * list.length - 1);
    await bot.sendMessage(chatId, list[randomNum]);
  }
});
