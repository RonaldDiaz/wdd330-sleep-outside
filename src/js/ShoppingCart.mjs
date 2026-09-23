import { renderWithTemplate, renderListWithTemplate, getLocalStorage, setLocalStorage, updateCartCount } from './utils.mjs';

export default class ShoppingCart {
  constructor(listElement, totalElement) {
    this.listElement = listElement;
    this.cartItems = [];
    this.totalElement = totalElement;
  }

  init() {
    if (!this.listElement) return;

    this.listElement.addEventListener('click', (event) => {
      const removeButton = event.target.closest('.cart-card__remove');
      if (removeButton) {
        this.removeItemFromCart(removeButton.dataset.id);
      }
    });

    this.renderContent();
  }
  
  renderContent() {
    if (!this.listElement) return;
    const cartRaw = getLocalStorage('so-cart');
    this.cartItems = Array.isArray(cartRaw) ? cartRaw : [];
    this.renderList(this.cartItems);
    this.renderCarTotal();
  }

  renderList(list) {
    if (!this.listElement) return;

    if (list.length === 0) {
      renderWithTemplate(emptyCartTemplate, this.listElement);
    } else {
      renderListWithTemplate(cartItemTemplate, this.listElement, list, 'afterbegin', true);
    }
  }

  calculateCartTotal() {
    return this.cartItems.reduce((total, item) => total + (Number(item.FinalPrice) || 0) * (item.Quantity || 1), 0);
  }
    
  renderCarTotal() {
    if (!this.totalElement) return;

    const cartTotal = this.calculateCartTotal();
    if (cartTotal === 0) {
      this.totalElement.innerHTML = '';
    } else {
      this.totalElement.innerHTML = `
        <p class="cart-footer">Total: $${cartTotal.toFixed(2)}</p>
      `;
    }
  }
  
  removeItemFromCart(id) {
    let cartItems = Array.isArray(getLocalStorage('so-cart')) ? getLocalStorage('so-cart') : [];
    cartItems = cartItems.filter(item => item.Id !== id);
    setLocalStorage('so-cart', cartItems);
    this.renderContent();
    updateCartCount();
  }
}

function cartItemTemplate(item) {
    const image = item.Images?.PrimarySmall || '/images/tent.svg';
    const name = item.NameWithoutBrand || item.Name || 'Product';
    const colorName = item.Colors?.[0]?.ColorName || 'Default';
    const quantity = item.Quantity || 1;
    const price = Number(item.FinalPrice) || 0;

    const newItem =
        `<li class='cart-card divider'>
        <button class='cart-card__remove' data-id='${item.Id}'>&times;</button>
    <a href='#' class='cart-card__image'>
      <img
        src='${image}'
        alt='${name}'
      />
    </a>
    <a href='#'>
      <h2 class='card__name'>${name}</h2>
    </a>
    <p class='cart-card__color'>${colorName}</p>
    <p class='cart-card__quantity'>Qty: ${quantity}</p>
    <p class='cart-card__price'>$${price.toFixed(2)}</p>
  </li>`;

    return newItem;
}

const emptyCartTemplate = `
  <li class="cart-empty">
    <p>Your cart is empty!</p>
    <a href="../index.html"><button>Keep Shopping</button></a>
  </li>`;
