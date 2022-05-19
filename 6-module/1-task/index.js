export default class UserTable {
  constructor(rows) {
    this.items = rows;
    this.elem = document.createElement("table");
    this.render();
  }

  render() {
    this.elem.innerHTML =  `
      <thead>
        <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Зарплата</th>
            <th>Город</th>
            <th></th>
        </tr>
      </thead>
    `;

    const tableBody = document.createElement("tbody");
    this.items.forEach(item => {
      const str = document.createElement("tr");
      const elemDelete = document.createElement("td");
      const btnDelete = document.createElement("button");
      btnDelete.innerHTML = "X";
      elemDelete.append(btnDelete);
      btnDelete.addEventListener("click", this.onDeleteClick);

      str.innerHTML += `
        <td>${1}</td>
        <td>${2}</td>
        <td>${3}</td>
        <td>${4}</td>
      `;
      str.append(elemDelete);
      tableBody.append(str);
    });
    this.elem.append(tableBody);
  }
  onDeleteClick(event) {
    event.currentTarget.parentElement.parentElement.remove();
    event.currentTarget.removeEventListener('click', this.onDeleteClick);
  }
}
