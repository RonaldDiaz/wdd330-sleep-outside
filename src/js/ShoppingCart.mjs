import { renderWithTemplate, renderListWithTemplate, getLocalStorage, setLocalStorage, updateCartCount } from './utils.mjs';
import { notificationManager } from './NotificationManager';

export default class ShoppingCart {
  constructor(listElement, totalElement) {
    this.listElement = listElement;
    this.cartItems = [];
    this.totalElement = totalElement;
  }

  init() {
    this.listElement.addEventListener('click', (event) => {
      if (event.target.classList.contains('cart-card__remove')) {
        this.removeItemFromCart(event.target.dataset.id);
      } else if (event.target.classList.contains('increase')) {
        this.changeQuantity(event.target.dataset.id, 1);
      } else if (event.target.classList.contains('decrease')) {
        this.changeQuantity(event.target.dataset.id, -1);
      } 
    });
    this.renderContent();      
  }
  
  renderContent() {
    this.cartItems = getLocalStorage('so-cart') || [];
    this.renderList(this.cartItems);
    this.renderCartTotal();
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
    
  renderCartTotal() {
    const cartTotal = this.calculateCartTotal();
    if (cartTotal === 0) {
      this.totalElement.innerHTML = '';
    } else {
      this.totalElement.innerHTML = `
        <p class="cart-footer">Total: $${cartTotal.toFixed(2)}</p>
        <a href="/checkout/index.html"><button type="button">Checkout</button></a>      
      `
    }
  }
  
  removeItemFromCart(id) {
    this.cartItems = this.cartItems.filter(item => item.Id !== id);
    setLocalStorage('so-cart', this.cartItems);
    this.renderContent();
    updateCartCount();
    notificationManager.show('Product removed from cart', 'warning');
  }

  changeQuantity(id, amount) {
    const product = this.cartItems.find(item => item.Id === id);
    product.Quantity = (product.Quantity || 1) + amount;
    if (product.Quantity < 1) product.Quantity = 1;
    setLocalStorage('so-cart', this.cartItems);
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
    <div class='cart-card__quantity-controls'>
      <button class='cart-card__qty-btn decrease' data-id='${item.Id}'>-</button>
      <span class='cart-card__quantity'>Qty: ${item.Quantity || 1}</span>
      <button class='cart-card__qty-btn increase' data-id='${item.Id}'>+</button>
    </div>
    <p class='cart-card__price'>$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

const emptyCartTemplate = `
  <li class="cart-empty">
    <p>Your cart is empty!</p>
    <a href="../index.html"><button>Keep Shopping</button></a>
  </li>`;
