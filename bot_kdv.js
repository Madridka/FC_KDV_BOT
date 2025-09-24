import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

dotenv.config();

const TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });
const USERS_FILE = "users.json";

const messageStore = {
  replyText:
    "Привет, это информационный бот ФК КДВ!\nПодпишись на наш паблик - @boroda_tomsk_youtube",
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextMatch =
  "✈️ // 28 сентября (вск)  \nКрылья-Советов-2 (Самара)- ФК КДВ\n23-ий тур Leon 2 Лига Б \n@boroda_tomsk_youtube";
const textButtonNextMatch = "Ссылка на матч";
const urlNextMatch = "https://fnl.pro/leon-b/matches/48960";

const prevMatch =
  "🏠 // Техническая победа\n21 сентября\nФК КДВ 3 - 0 Соколь (Казань) \n22-ой тур Leon 2 Лига Б \n@boroda_tomsk_youtube";
const textButtonPrevMatch = "Статистика матча";
const urlPrevMatch = "https://fnl.pro/leon-b/matches/48943";

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  sendWelcome(chatId);
});

function sendWelcome(chatId) {
  bot.sendMessage(chatId, "Добро пожаловать! Нажмите на кнопку из меню.", {
    reply_markup: {
      keyboard: [
        ["Перезапустить бота", "Инфо"],
        ["Актуальная таблица"],
        ["Предыдущий матч", "Ближайший матч"],
      ],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  });
}

const saveUser = (chatId, username) => {
  let users = [];
  if (fs.existsSync(USERS_FILE)) {
    users = JSON.parse(fs.readFileSync(USERS_FILE));
  }

  // Проверяем, есть ли уже такой id
  if (!users.some((u) => u.id === chatId)) {
    users.push({ id: chatId, username: username || null });
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  }
};

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from?.username;
  const text = msg.text;
  saveUser(chatId, username);

  if (text === "Перезапустить бота") {
    sendWelcome(chatId);
  }

  if (text === "Инфо") {
    bot.sendMessage(chatId, messageStore.replyText);
  }

  // if (text === "Список матчей") {
  //   const imagePath = path.join(__dirname, "static", "matches.jpg");
  //   bot.sendPhoto(chatId, imagePath, {
  //     caption: "📅 Ближайшие матчи ФК КДВ \n@boroda_tomsk_youtube",
  //   });
  // }

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
