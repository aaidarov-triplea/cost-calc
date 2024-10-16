//Функция для получение данных расхода
export const getExpenses = () => {
  let totalExpense = 0;
  const expenseBtn = document.getElementById("expense-btn");

  //Вешаем событие на кнопку
  expenseBtn.addEventListener("click", function () {
    // Получаем значения из полей ввода
    const expenseName = document.getElementById("expense-name").value;
    const expense = document.getElementById("expense-amount").value;

    // Проверяем, что поля не пустые и что сумма расхода является числом
    if (expenseName && expense && !isNaN(expense)) {
      // Преобразуем сумму в число и прибавляем к общей сумме
      totalExpense += parseFloat(expense);
      // Обновляем отображение общей суммы
      document.getElementById("total-expense").innerText = `${totalExpense} ⃀`;

      // Создаем новый элемент для списка расходов
      const expenseList = document.getElementById("expense-list");

      // Создаем контейнер для отображения нового расхода
      const expenseItem = document.createElement("div");
      expenseItem.classList.add("expense-item");
      expenseItem.innerHTML = `
        <span><strong>${expenseName}</strong></span>
        <span>Сумма: <strong>${expense} ⃀</strong></span>
      `;

      // Добавляем новый элемент в список расходов
      expenseList.appendChild(expenseItem);

      // Отправляем POST-запрос на сервер для добавления данных
      fetch("http://localhost:3000/api/expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: expenseName,
          amount: parseFloat(expense), // Преобразуем строку в число
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Доход добавлен:", data);
        })
        .catch((error) => {
          console.error("Ошибка при добавлении дохода:", error);
        });

      // Очищаем поля ввода
      document.getElementById("expense-name").value = "";
      document.getElementById("expense-amount").value = "";
    } else {
      alert("Пожалуйста, заполните оба поля!");
    }
  });

  // GET-запрос для получения списка доходов с сервера и отображения их на странице
  const fetchExpenseList = () => {
    fetch("http://localhost:3000/api/expense")
      .then((res) => res.json())
      .then((data) => {
        const expenseList = document.getElementById("expense-list");
        expenseList.innerHTML = ""; // Очищаем список перед обновлением

        data.forEach((expense) => {
          const expenseItem = document.createElement("div");
          expenseItem.classList.add("expense-item");
          expenseItem.innerHTML = `
            <span><strong>${expense.name}</strong></span>
            <span>Сумма: <strong>${expense.amount} ⃀</strong></span>
          `;

          // Добавляем каждый элемент дохода в список
          expenseList.appendChild(expenseItem);

          // Обновляем общую сумму
          totalExpense += expense.amount;
          document.getElementById(
            "total-expense"
          ).innerText = `${totalExpense} ⃀`;
        });

        // Итого рсхода в месяц:
        const totalExpenses = (document.getElementById(
          "total-expenses"
        ).innerText = `${totalExpense} ⃀`);
      })
      .catch((error) => {
        console.error("Ошибка при получении списка доходов:", error);
      });
  };

  // Вызываем функцию для получения данных при загрузке страницы
  fetchExpenseList();
};
