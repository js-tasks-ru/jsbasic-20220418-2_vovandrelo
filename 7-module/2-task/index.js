import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
  }
  render() {
    this.elem = document.createElement("div");
    this.elem.classList.add("modal");
    this.elem.innerHTML = `
      <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>

            <h3 class="modal__title">Вот сюда нужно добавлять заголовок</h3>
        </div>
        <div class="modal__body">
          A сюда нужно добавлять содержимое тела модального окна
        </div>
      </div>
    `;
  }
  open() {
    document.body.classList.add("is-modal-open");
    document.body.append(this.elem);
    this.elem.querySelector(".modal__close").addEventListener("click", () => this.close(), {once: true});
    document.addEventListener('keydown', this.onTapKey);
  }
  setTitle(title) {
    this.elem.querySelector(".modal__title").innerHTML = title;
  }
  setBody(node) {
    const modalBody = this.elem.querySelector(".modal__body");
    modalBody.innerHTML = "";
    modalBody.append(node);
  }
  close() {
    if (this.elem) {
      document.body.classList.remove("is-modal-open");
      this.elem.remove();
      this.elem = null;
    }
  }
  onTapKey = event => {
    if (event.key == 'Escape') {
      this.close();
      document.removeEventListener('keydown', this.onTapKey);
    }
  }
}
