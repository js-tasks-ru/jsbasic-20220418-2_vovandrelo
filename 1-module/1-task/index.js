function factorial(n) {
  let value = 1;
  for (let index = 1; index <= n; index++) {
    value *= index;
  }
  return value;
}
