import { renderWithTemplate, renderListWithTemplate, getLocalStorage, setLocalStorage, updateCartCount } from './utils.mjs';

export default class ShoppingCart {
  constructor(listElement, totalElement) {
    this.listElement = listElement;
    this.cartItems = [];
    this.totalElement = totalElement;
  }

  init() {
    this.renderContent();      
  }
  
  renderContent() {
    this.cartItems = getLocalStorage('so-cart') || [];
    this.renderList(this.cartItems);
    this.listElement.addEventListener('click', (event) => {
      if (event.target.classList.contains('cart-card__remove')) {
        this.removeItemFromCart(event.target.dataset.id);
      }
    });
    this.renderCarTotal();
  }

  renderList(list) {
    if (list.length === 0) {
      renderWithTemplate(emptyCartTemplate, this.listElement);
    } else {
      renderListWithTemplate(cartItemTemplate, this.listElement, list, 'afterbegin', true);
    }
  }

  calculateCartTotal() {
    return this.cartItems.reduce((total, item) => total + item.FinalPrice * (item.Quantity || 1), 0);
  }
    
  renderCarTotal() {
    const cartTotal = this.calculateCartTotal();
    if (cartTotal === 0) {
      this.totalElement.innerHTML = '';
    } else {
      this.totalElement.innerHTML = `
        <p class="cart-footer">Total: $${cartTotal.toFixed(2)}</p>      
      `
    }
  }
  
  removeItemFromCart(id) {
    let cartItems = getLocalStorage('so-cart') || [];
    cartItems = cartItems.filter(item => item.Id !== id);
    setLocalStorage('so-cart', cartItems);
    this.renderContent();
    updateCartCount();
  }
}

function cartItemTemplate(item) {
    const newItem =
        `<li class='cart-card divider'>
        <button class='cart-card__remove' data-id='${item.Id}'>&times;</button>
    <a href='#' class='cart-card__image'>
      <img
        src='${item.Images.PrimarySmall}'
        alt='${item.Name}'
      />
    </a>
    <a href='#'>
      <h2 class='card__name'>${item.Name}</h2>
    </a>
    <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
    <p class='cart-card__quantity'>Qty: ${item.Quantity || 1}</p>
    <p class='cart-card__price'>$${item.FinalPrice}</p>
  </li>`;

    return newItem;
}

const emptyCartTemplate = `
  <li class="cart-empty">
    <p>Your cart is empty!</p>
    <a href="../index.html"><button>Keep Shopping</button></a>
  </li>`;
