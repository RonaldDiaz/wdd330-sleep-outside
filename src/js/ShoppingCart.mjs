import { renderWithTemplate, renderListWithTemplate, getLocalStorage } from './utils.mjs';

export default class ShoppingCart {
    constructor(listElement) {
        this.listElement = listElement;
        this.cartItems = [];
    }

    init() {
        this.cartItems = getLocalStorage('so-cart') || [];
        this.renderList(this.cartItems);
    }

    renderList(list) {
        if (list.length === 0) {
            renderWithTemplate(emptyCartTemplate, this.listElement);
        } else {
            renderListWithTemplate(cartItemTemplate, this.listElement, list, 'afterbegin', true);
        }
    }

    calculateCartTotal() {
        let total = 0;
        this.cartItems.forEach(item => {
            total += item.FinalPrice
        });
        return total;
    }
}

function cartItemTemplate(item) {
    const newItem =
        `<li class='cart-card divider'>
    <a href='#' class='cart-card__image'>
      <img
        src='${item.Image}'
        alt='${item.Name}'
      />
    </a>
    <a href='#'>
      <h2 class='card__name'>${item.Name}</h2>
    </a>
    <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
    <p class='cart-card__quantity'>qty: 1</p>
    <p class='cart-card__price'>$${item.FinalPrice}</p>
  </li>`;

    return newItem;
}

const emptyCartTemplate = `
  <li class="cart-empty">
    <p>Your cart is empty!</p>
    <a href="../index.html"><button>Keep Shopping</button></a>
  </li>`;
