import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    console.log(cart);
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (this.elem.offsetHeight !== 0) {
      let initialTopCoord = this.elem.getBoundingClientRect().top + window.pageYOffset;

      if (document.documentElement.clientWidth <= 767) {
        this.elem.style.position = "";
        this.elem.style.top = "";
        this.elem.style.zIndex = "";
        this.elem.style.left = "";
        this.elem.style.left = "";
        return;
      }

      if (window.pageYOffset > initialTopCoord) {
        this.elem.style.position = "fixed";
        this.elem.style.top = "50px";
        this.elem.style.zIndex = 1000;
        const offsetRight = document.querySelector('.container').getBoundingClientRect().right + 20;
        const offsetLeft = document.documentElement.clientWidth - this.elem.offsetWidth - 10;
        const newOffset = Math.min(offsetRight, offsetLeft);
        this.elem.style.left = newOffset + "px";
        this.elem.style.left = newOffset + "px";
      } else if (window.pageYOffset === 0) {
        this.elem.style.position = "";
        this.elem.style.top = "";
        this.elem.style.zIndex = "";
        this.elem.style.left = "";
        this.elem.style.left = "";
      }
    }
  }
}
