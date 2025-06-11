const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// POST-обработка данных
app.post('/submit', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('<h2 style="color:red;">❌ Не хватает данных!</h2>');
  }

  const user = { username, password };

  // Чтение + сохранение
  let users = [];
  if (fs.existsSync('users.json')) {
    users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
  }
  users.push(user);
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

  // Ответ — HTML
  res.send(`
    <div style="
      font-family: sans-serif;
      background-color: #f0fdf4;
      color: #065f46;
      padding: 30px;
      margin: 40px auto;
      max-width: 500px;
      border-radius: 15px;
      box-shadow: 0 0 15px rgba(0,0,0,0.1);
    ">
      <h2>✅ Данные получены успешно!</h2>
      <p><strong>👤 Имя пользователя:</strong> ${username}</p>
      <p><strong>🔒 Пароль:</strong> ${password}</p>
    </div>
  `);
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер работает на http://localhost:${PORT}`);
});
