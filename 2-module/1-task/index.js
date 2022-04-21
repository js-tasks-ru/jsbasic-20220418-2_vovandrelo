function sumSalary(salaries) {
  let sum = 0;
    for (let key in salaries) {
      const salary = salaries[key];
      if (typeof(salary) === "number") {
        if (!isNaN(salary) && salary !== -Infinity && salary !== +Infinity) {
          sum += salary;
        }
      }
    }
  return sum;
}
