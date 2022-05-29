import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
  }
  render() {
    this.elem = document.createElement("div");
    this.elem.classList.add("ribbon");
    this.elem.innerHTML = `
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>

      <nav class="ribbon__inner">
        ${this.categories.map(elem => `<a href="#" class="ribbon__item" data-id="${elem.id}">${elem.name}</a>`).join("")}
      </nav>

      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `;
    this.ribbonInner = this.elem.querySelector(".ribbon__inner");
    this.arrowRight = this.elem.querySelector(".ribbon__arrow_right");
    this.arrowLeft = this.elem.querySelector(".ribbon__arrow_left");

    this.arrowControl();
    this.ribbonInner.addEventListener("scroll", () => this.arrowControl());
    this.ribbonInner.addEventListener("click", event => this.onClickAdd(event));
    this.arrowRight.addEventListener("click", event => this.move(event));
    this.arrowLeft.addEventListener("click", event => this.move(event));
  }
  move(event) {
    if (event.currentTarget.classList.contains("ribbon__arrow_right")) {
      this.ribbonInner.scrollBy(350, 0);
    } else if (event.currentTarget.classList.contains("ribbon__arrow_left")) {
      this.ribbonInner.scrollBy(-350, 0);
    } else {
      console.log("Что-то сильно пошло не так...");
    }
  }
  arrowControl() {
    if (this.ribbonInner.scrollLeft === 0) {
      this.arrowLeft.classList.remove("ribbon__arrow_visible");
    } else if (this.ribbonInner.scrollLeft + this.ribbonInner.clientWidth === this.ribbonInner.scrollWidth) {
      this.arrowRight.classList.remove("ribbon__arrow_visible");
    } else {
      this.arrowLeft.classList.add("ribbon__arrow_visible");
      this.arrowRight.classList.add("ribbon__arrow_visible");
    }
  }
  onClickAdd(event) {
    event.preventDefault();

    this.elem.querySelectorAll(".ribbon__item").forEach(item => item.classList.remove("ribbon__item_active"));

    event.target.classList.add("ribbon__item_active");

    const customEvent = new CustomEvent('ribbon-select', {
      detail: event.target.dataset.id,
      bubbles: true
    });

    this.elem.dispatchEvent(customEvent);
  }
}
