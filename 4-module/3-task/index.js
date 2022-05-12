function highlight(table) {
  const tableRows = table.querySelectorAll("tr");

  tableRows.forEach((row, i) => {
    // Пропуск заголовка таблицы
    if (i === 0) {
      return;
    }

    // Получение необходимых ячеек:
    const cellsAge = row.querySelectorAll("td")[1];
    const cellsGender = row.querySelectorAll("td")[2];
    const cellsStatus = row.querySelectorAll("td")[3];

    // Корректировка таблицы на основе возраста:
    if (cellsAge.innerText < 18) {
      row.style.textDecoration = "line-through";
    }

    // Корректировка таблицы на основе пола:
    if (cellsGender.innerText === "m") {
      row.classList.add("male");
    } else if (cellsGender.innerText === "f") {
      row.classList.add("female");
    }

    // Корректировка таблицы на основе статуса:
    if (cellsStatus.dataset.available) {
      if (cellsStatus.dataset.available === "true") {
        row.classList.add("available");
      } else if (cellsStatus.dataset.available === "false") {
        row.classList.add("unavailable");
      }
    } else {
      row.setAttribute("hidden", true);
    }
  });
}
