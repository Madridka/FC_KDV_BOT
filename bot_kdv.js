import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

const messageStore = {
  replyText: "Привет, это ответ из хранилища",
};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Нажми на меня", callback_data: "send_stored_message" }],
        [{ text: "Инфо", callback_data: "send_info_message" }],
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

  if (data === "send_info_message") {
    bot.sendMessage(chatId, messageStore.replyText);
  }

  bot.answerCallbackQuery(query.id);
});
