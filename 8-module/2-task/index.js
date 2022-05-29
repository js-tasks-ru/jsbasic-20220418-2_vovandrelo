import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = null;
    this.render();
  }

  render() {
    this.elem = document.createElement("div");
    this.elem.classList.add("products-grid");
    this.elemInner = document.createElement("div");
    this.elemInner.classList.add("products-grid__inner");
    this.elem.append(this.elemInner);

    this.updateFilter();
  }

  updateFilter(filters) {
    this.filters = Object.assign(this.filters, filters);
    console.log(this.filters);
    let prodFil = this.products;
    if (this.filters.noNuts) {
      prodFil = prodFil.filter(prod => !prod.nuts);
    }
    if (this.filters.vegeterianOnly) {
      prodFil = prodFil.filter(prod => prod.vegeterian);
    }
    if (this.filters.maxSpiciness) {
      prodFil = prodFil.filter(prod => prod.spiciness <= this.filters.maxSpiciness);
    }
    if (this.filters.category) {
      prodFil = prodFil.filter(prod => prod.category === this.filters.category);
    }
    this.elemInner.innerHTML = "";
    prodFil.forEach(product => {
      this.elemInner.append(new ProductCard(product).elem);
    });
  }
}
