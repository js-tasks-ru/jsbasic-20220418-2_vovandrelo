function makeDiagonalRed(table) {
  const cells = table.querySelectorAll("td");

  // Определение размера матрицы:
  let size = 0;
  while (Math.pow(size, 2) !== cells.length) {
    size++;
  }

  // Заливка диагональных элементов:
  let idxDiagElem = 0;
  for(let i = 0; i < size; i++) {
    if (i !== 0) {
      idxDiagElem += size + 1;
    }
    cells[idxDiagElem].style.backgroundColor = "red";
  }
}
