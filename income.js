//Функция для получение данных дохода
export const getIncome = () => {
  let totalAmount = 0;
  const incomeBtn = document.getElementById("income-btn");
  //Вешаем событие на кнопку
  incomeBtn.addEventListener("click", function () {
    // Получаем значения из полей ввода
    const name = document.getElementById("income-name").value;
    const amount = document.getElementById("income-amount").value;

    // Проверяем, что поля не пустые и что сумма дохода является числом
    if (name && amount && !isNaN(amount)) {
      // Преобразуем сумму в число и прибавляем к общей сумме
      totalAmount += parseFloat(amount);
      // Обновляем отображение общей суммы
      document.getElementById("total-amount").innerText = `${totalAmount} ⃀`;

      // Создаем новый элемент для списка доходов
      const incomeList = document.getElementById("income-list");

      // Создаем контейнер для отображения нового дохода
      const incomeItem = document.createElement("div");
      incomeItem.classList.add("income-item");
      incomeItem.innerHTML = `
        <span>Наименование: <strong>${name}</strong></span>
        <span>Сумма: <strong>${amount} ⃀</strong></span>
      `;

      // Добавляем новый элемент в список доходов
      incomeList.appendChild(incomeItem);

      // Отправляем POST-запрос на сервер для добавления данных
      fetch("http://localhost:3000/api/income", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          amount: parseFloat(amount), // Преобразуем строку в число
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
      document.getElementById("income-name").value = "";
      document.getElementById("income-amount").value = "";
    } else {
      alert("Пожалуйста, заполните оба поля!");
    }
  });

  // GET-запрос для получения списка доходов с сервера и отображения их на странице
  const fetchIncomeList = () => {
    fetch("http://localhost:3000/api/income")
      .then((res) => res.json())
      .then((data) => {
        const incomeList = document.getElementById("income-list");
        incomeList.innerHTML = ""; // Очищаем список перед обновлением

        data.forEach((income) => {
          const incomeItem = document.createElement("div");
          incomeItem.classList.add("income-item");
          incomeItem.innerHTML = `
            <span>Наименование: <strong>${income.name}</strong></span>
            <span>Сумма: <strong>${income.amount} ⃀</strong></span>
          `;

          // Добавляем каждый элемент дохода в список
          incomeList.appendChild(incomeItem);

          // Обновляем общую сумму
          totalAmount += income.amount;
          document.getElementById(
            "total-amount"
          ).innerText = `${totalAmount} ⃀`;
        });

        //Итого дахода в месяц:
        const totalAmounts = (document.getElementById(
          "total-amounts"
        ).innerText = `${totalAmount} ⃀`);
      })
      .catch((error) => {
        console.error("Ошибка при получении списка доходов:", error);
      });
  };

  // Вызываем функцию для получения данных при загрузке страницы
  fetchIncomeList();
};
