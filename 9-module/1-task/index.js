export default function promiseClick(button) {
  return new Promise((res, rej) => {
    button.addEventListener("click", event => {
      res(event);
    });
  });
}
