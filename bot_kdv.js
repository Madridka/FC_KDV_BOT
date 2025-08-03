import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

const messageStore = {
  replyText: "Привет, это информационный бот ФК КДВ!",
};

const matches = {
  matches1: "Четверг, 7 августа, Анри - КДВ // Кубок России",
  matches2: "Воскресенье, 10 августа, Амкар - КДВ // 16-й тур лиги",
  matches3: "Воскресенье, 17 августа, КДВ - Динамо-Б // 17-й тур",
};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Инфо", callback_data: "send_stored_message" }],
        [{ text: "Список матчей", callback_data: "send_matches" }],
      ],
    },
  };

  bot.sendMessage(chatId, "Добро пожаловать! Нажми на кнопку ниже:", options);
});

bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data === "send_stored_message") {
    bot.sendMessage(chatId, messageStore.replyText);
  }

  if (data === "send_matches") {
    bot.sendMessage(
      chatId,
      `1. ${matches.matches1} \n2. ${matches.matches2} \n3. ${matches.matches3}`
    );
  }

  bot.answerCallbackQuery(query.id);
});
