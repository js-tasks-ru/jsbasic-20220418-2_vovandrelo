import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = [];

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
  }

  addProduct(product) {
    if (product) {
      if (this.cartItems.length !== 0) {
        const exist = this.cartItems.some(item => item.product.id === product.id)
        if (exist) {
          const searchProd = this.cartItems.filter(item => item.product.id === product.id)
          searchProd[0].count++;
          this.onProductUpdate(searchProd[0]);
          return;
        }
      }
      const newItem = {
        product,
        count: 1
      };
      this.cartItems.push(newItem);
      this.onProductUpdate(newItem.product);
    } else {
      console.log("Что-то сильно пошло не так...");
    }
  }

  updateProductCount(productId, amount) {
    const searchProd = this.cartItems.filter(item => item.product.id === productId)
    if (searchProd[0]) {
      const elem = {...searchProd[0]};
      elem.count += amount;

      if (elem.count === 0) {
        this.cartItems = this.cartItems.filter(item => item.product.id !== productId)
        this.onProductUpdate(elem);
      } else {
        searchProd[0].count += amount;
        this.onProductUpdate(searchProd[0]);
      }
    }
  }

  isEmpty() {
    if (this.cartItems.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  getTotalCount() {
    let count = 0;
    this.cartItems.forEach(item => {
      count += item.count;
    });
    return count;
  }

  getTotalPrice() {
    let price = 0;
    this.cartItems.forEach(item => {
      price += item.product.price * item.count;
    });
    return price;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');

    const parentElem = document.createElement("div");
    this.cartItems.forEach(item => {
      parentElem.append(this.renderProduct(item.product, item.count));
    });
    parentElem.append(this.renderOrderForm());
    const btnMinus = parentElem.querySelectorAll(".cart-counter__button_minus");
    const btnPlus = parentElem.querySelectorAll(".cart-counter__button_plus");
    const form = parentElem.querySelector("form");

    form.addEventListener("submit", this.onSubmit);

    btnMinus.forEach(btn => {
      const idCard = btn.closest(".cart-product").dataset.productId;
      btn.addEventListener("click", () => this.updateProductCount(idCard, -1));
    });

    btnPlus.forEach(btn => {
      const idCard = btn.closest(".cart-product").dataset.productId;
      btn.addEventListener("click", () => this.updateProductCount(idCard, +1));
    });

    this.modal.setBody(parentElem);
    this.modal.open();
  }


  onProductUpdate(cartItem) {
    if (document.body.classList.contains("is-modal-open")) {
      let productId = cartItem.product.id;
      let productCount = this.modal.elem.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = this.modal.elem.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      let infoPrice = this.modal.elem.querySelector(`.cart-buttons__info-price`);

      if (this.cartItems.length === 0) {
        this.modal.close();
      } else if (cartItem.count === 0) {
        this.modal.elem.querySelector(`[data-product-id=${cartItem.product.id}]`).remove();
      } else {
        productCount.innerHTML = cartItem.count;
        productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
        infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
      }
    }
    this.cartIcon.update(this);
  }

  onSubmit = event => {
    event.preventDefault();
    fetch('https://httpbin.org/post',
    {
      method: "POST",
      body: new FormData(event.currentTarget)
    })
    .then(() => {
      this.cartItems = [];
      this.cartIcon.update(this);
      this.modal.setTitle('Success!');
      console.log(this.cartItems);
      //this.cartItems = null;
      const newModalBody = createElement(`
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>
      `);
      this.modal.setBody(newModalBody);
    })
    .catch(error => console.log("Error:", error));
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
