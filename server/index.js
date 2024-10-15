const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Подключение к MongoDB
const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@costcalcdb.21a8c.mongodb.net/costDB?retryWrites=true&w=majority`;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Подключено к MongoDB"))
  .catch((err) => console.error("Ошибка подключения к MongoDB: ", err));

// Определение схемы
const incomeSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  dateAdded: { type: Date, default: Date.now },
});

// Определение схемы
const expenseSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  dateAdded: { type: Date, default: Date.now },
});

// Создание модели для коллекции 'expense'
const expenseItem = mongoose.model("Expense", expenseSchema, "expense");
// Создание модели для коллекции 'income'
const incomeItem = mongoose.model("Income", incomeSchema, "income");

app.get("/api/income", async (req, res) => {
  try {
    const items = await incomeItem.find(); // Получение всех элементов из коллекции 'income'
    res.json(items); // Отправка результата клиенту в формате JSON
    console.log(items); // Логирование для отладки
  } catch (err) {
    res.status(500).json({ message: "Ошибка получения данных", error: err });
  }
});

// POST-запрос для добавления нового элемента
app.post("/api/income", async (req, res) => {
  try {
    const newIncome = new incomeItem({
      name: req.body.name,
      amount: req.body.amount,
    });

    const savedIncome = await newIncome.save();
    res.status(201).json(savedIncome);
  } catch (err) {
    res.status(400).json({ message: "Ошибка добавления данных", error: err });
  }
});

app.get("/api/expense", async (req, res) => {
  try {
    const items = await expenseItem.find(); // Получение всех элементов из коллекции 'income'
    res.json(items); // Отправка результата клиенту в формате JSON
    console.log(items); // Логирование для отладки
  } catch (err) {
    res.status(500).json({ message: "Ошибка получения данных", error: err });
  }
});

// POST-запрос для добавления нового элемента
app.post("/api/expense", async (req, res) => {
  try {
    const newExpense = new expenseItem({
      name: req.body.name,
      amount: req.body.amount,
    });

    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(400).json({ message: "Ошибка добавления данных", error: err });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту http://localhost:${PORT}`);
});
