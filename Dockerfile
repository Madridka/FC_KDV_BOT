# Используем лёгкий образ Node.js
FROM node:20-alpine

# Рабочая директория
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install --omit=dev

# Копируем остальной код
COPY . .

# Запускаем приложение
CMD ["node", "bot_kdv.js"]
