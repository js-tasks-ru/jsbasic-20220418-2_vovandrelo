import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    this.carousel = new Carousel(slides);
    document.querySelector("[data-carousel-holder]").append(this.carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    document.querySelector("[data-ribbon-holder]").append(this.ribbonMenu.elem);

    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    document.querySelector("[data-slider-holder]").append(this.stepSlider.elem);

    this.cartIcon = new CartIcon();
    document.querySelector("[data-cart-icon-holder]").append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);

    const products = await (await fetch("./products.json")).json();

    this.productsGrid = new ProductsGrid(products);
    const gridHolder = document.querySelector("[data-products-grid-holder]");
    gridHolder.innerHTML = "";
    gridHolder.append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    document.body.addEventListener("product-add", event => {
      const product = products.filter(prod => prod.id === event.detail);
      this.cart.addProduct(product[0]);
    });

    document.body.addEventListener("slider-change", event => {
      this.productsGrid.updateFilter({
        maxSpiciness: event.detail // значение остроты из события 'slider-change'
      });
    });

    document.body.addEventListener("ribbon-select", event => {
      this.productsGrid.updateFilter({
        category: event.detail // значение остроты из события 'slider-change'
      });
    });

    document.body.addEventListener("change", event => {
      console.dir(event.target.id);
      if (event.target.id === "nuts-checkbox") {
        this.productsGrid.updateFilter({
          noNuts: event.target.checked
        });
      } else if (event.target.id === "vegeterian-checkbox") {
        this.productsGrid.updateFilter({
          vegeterianOnly: event.target.checked // новое значение чекбокса
        });
      } else {
        console.log("Что-то сильно пошло не так...");
      }
    });
  }
}
