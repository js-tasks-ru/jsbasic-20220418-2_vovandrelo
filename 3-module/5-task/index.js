function getMinMax(str) {
  const newStr = str.split(/ \D* /);
  return {
    min: Math.min(...newStr),
    max: Math.max(...newStr),
  };
}
