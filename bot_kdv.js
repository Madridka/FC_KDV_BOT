import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

const messageStore = {
  replyText:
    "Привет, это информационный бот ФК КДВ! Скоро здесь будет больше информации!\nА пока подпишись на наш паблик - @boroda_tomsk_youtube",
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextMatch =
  "✈️ // 17 августа (вск)  \nФК КДВ - Динамо-Барнаул\n17-ый тур Leon 2 Лига Б \n@boroda_tomsk_youtube";
const textButtonNextMatch = "Ссылка на матч";
const urlNextMatch = "https://fnl.pro/leon-b/matches/48803";

const prevMatch =
  "✈️ // ПОБЕЕЕЕДАААА!!!!! 10 августа\nАмкар (Пермь) 2 - 3 ФК КДВ \n16-ый тур Leon 2 Лига Б \n@boroda_tomsk_youtube";
const textButtonPrevMatch = "Статистика матча";
const urlPrevMatch = "https://fnl.pro/leon-b/matches/48775";

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  sendWelcome(chatId);
});

function sendWelcome(chatId) {
  bot.sendMessage(chatId, "Добро пожаловать! Нажмите на кнопку из меню.", {
    reply_markup: {
      keyboard: [
        ["Перезапустить бота", "Инфо"],
        ["Актуальная таблица", "Список матчей"],
        ["Предыдущий матч", "Ближайший матч"],
      ],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  });
}

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "Перезапустить бота") {
    sendWelcome(chatId);
  }

  if (text === "Инфо") {
    bot.sendMessage(chatId, messageStore.replyText);
  }

  if (text === "Список матчей") {
    const imagePath = path.join(__dirname, "static", "matches.jpg");
    bot.sendPhoto(chatId, imagePath, {
      caption: "📅 Ближайшие матчи ФК КДВ \n@boroda_tomsk_youtube",
    });
  }

  if (text === "Актуальная таблица") {
    const imagePath = path.join(__dirname, "static", "table.png");
    bot.sendPhoto(chatId, imagePath, {
      caption:
        "🏆 Актуальная таблица Leon Лига Б, группа 4 \n@boroda_tomsk_youtube",
    });
  }

  if (text === "Ближайший матч") {
    bot.sendMessage(chatId, nextMatch, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: textButtonNextMatch,
              url: urlNextMatch,
            },
          ],
        ],
      },
    });
  }

  if (text === "Предыдущий матч") {
    bot.sendMessage(chatId, prevMatch, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: textButtonPrevMatch,
              url: urlPrevMatch,
            },
          ],
        ],
      },
    });
  }
});
