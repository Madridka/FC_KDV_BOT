import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

const messageStore = {
  replyText:
    "Привет, это информационный бот ФК КДВ! Скоро здесь будет больше информации!\nА пока подпишись на наш паблик - @boroda_tomsk_youtube",
};

const matches = {
  matches1:
    "✈️ | 7 августа (чт) 16:30 тск // Анри (Владивосток) - ФК КДВ // Кубок России",
  matches2: "✈️ | 10 августа (вск) // Амкар (Пермь) - ФК КДВ // 16-й тур",
  matches3: "🏠 | 17 августа (вск) // ФК КДВ - Динамо (Барнаул) // 17-й тур",
  matches4:
    "✈️ | 24 августа (вск) // Челябинск-2 (Челябинск) - ФК КДВ // 18-й тур",
  matches5:
    "🏠 | 31 августа (вск) // ФК КДВ - Оренбург-2 (Оренбург) // 19-й тур",
};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Добро пожаловать! Нажмите на кнопку из меню", {
    reply_markup: {
      keyboard: [["Инфо"], ["Список матчей"]],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  });
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "Инфо") {
    bot.sendMessage(chatId, messageStore.replyText);
  }

  if (text === "Список матчей") {
    bot.sendMessage(
      chatId,
      `1. ${matches.matches1} \n2. ${matches.matches2} \n3. ${matches.matches3} \n4. ${matches.matches4} \n5. ${matches.matches5}`
    );
  }
});
