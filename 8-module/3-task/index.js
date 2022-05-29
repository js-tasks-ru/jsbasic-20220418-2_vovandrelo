export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
      if (searchProd[0].count + amount === 0) {
        this.cartItems = this.cartItems.filter(item => item.product.id !== productId)
      } else {
        searchProd[0].count += amount;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче
    this.cartIcon.update(this);
  }
}
