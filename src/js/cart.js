import { getLocalStorage, updateCartCount } from './utils.mjs';

function renderCartContents() {
  const cartList = document.querySelector('.product-list');

  if (!cartList) {
    return;
  }

  const cartItems = getLocalStorage('so-cart') || [];

  if (cartItems.length === 0) {
    cartList.innerHTML = `
      <li class="cart-empty">
        <p>Your cart is empty!</p>
        <a href="../index.html"><button>Keep Shopping</button></a>
      </li>`;
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  cartList.innerHTML = htmlItems.join('');
}

function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
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

renderCartContents();
updateCartCount();
