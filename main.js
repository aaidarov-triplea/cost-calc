import { getIncome } from "./income.js";
import { getExpenses } from "./expense.js";

const getTotal = () => {
  const totalBtn = document.getElementById("total-btn");

  totalBtn.addEventListener("click", function () {
    const income = document.getElementById("total-amounts").innerText; // Получаем текстовое значение доходов
    const expense = document.getElementById("total-expenses").innerText; // Получаем текстовое значение расходов
    const total = document.getElementById("total"); // Элемент, куда выводим результат

    // Преобразуем текст в числа, убирая символы валюты и пробелы
    const incomeValue = parseFloat(income.replace(" ⃀", "").trim());
    const expenseValue = parseFloat(expense.replace(" ⃀", "").trim());

    // Вычисляем итоговую сумму и обновляем текст элемента
    total.innerText = `${incomeValue - expenseValue} ⃀`;
  });
};

getTotal();
getIncome();
getExpenses();
