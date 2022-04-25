function camelize(str) {
  const arr = str.split("-").map((elem, i) => i === 0 ? elem : elem[0].toUpperCase() + elem.slice(1));
  return arr.join("");
}
