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
  "✈️ // 7 августа (чт) 16:30 тск \nАнри (Владивосток) - ФК КДВ \nКубок России \n@boroda_tomsk_youtube";
const textButtonNextMatch = "Ссылка на трансляцию";
const urlNextMatch =
  "https://news.sportbox.ru/Vidy_sporta/Futbol/Russian_Cup/spbvideo_NI2227713_translation_Anri___KDV_FONBET_Kubok_Rossii_po_futbolu_sezona_2025_2026_gg";

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  sendWelcome(chatId);
});

function sendWelcome(chatId) {
  bot.sendMessage(chatId, "Добро пожаловать! Нажмите на кнопку из меню.", {
    reply_markup: {
      keyboard: [
        ["Перезапустить бота"],
        ["Инфо", "Список матчей"],
        ["Актуальная таблица", "Ближайший матч (+ссылка)"],
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
    const imagePath = path.join(__dirname, "static", "table2.png");
    bot.sendPhoto(chatId, imagePath, {
      caption:
        "🏆 Актуальная таблица Leon Лига Б, группа 4 \n@boroda_tomsk_youtube",
    });
  }

  if (text === "Ближайший матч (+ссылка)") {
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
});
