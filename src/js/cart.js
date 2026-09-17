import ShoppingCart from './ShoppingCart.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();
const container = document.querySelector('.product-list');
const shoppingCart = new ShoppingCart(container);
shoppingCart.init();

// function renderCartContents() {
//   // const cartItems = getLocalStorage('so-cart') || [];
//   // if (cartItems.length === 0) {
//   //   document.querySelector('.product-list').innerHTML = `
//   //     <li class="cart-empty">
//   //       <p>Your cart is empty!</p>
//   //       <a href="../index.html"><button>Keep Shopping</button></a>
//   //     </li>`;
//   //   return;
//   // }
//   const htmlItems = cartItems.map((item) => cartItemTemplate(item));
//   document.querySelector('.product-list').innerHTML = htmlItems.join('');
// }

// // function cartItemTemplate(item) {
// //   const newItem = `<li class='cart-card divider'>
// //   <a href='#' class='cart-card__image'>
// //     <img
// //       src='${item.Image}'
// //       alt='${item.Name}'
// //     />
// //   </a>
// //   <a href='#'>
// //     <h2 class='card__name'>${item.Name}</h2>
// //   </a>
// //   <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
// //   <p class='cart-card__quantity'>qty: 1</p>
// //   <p class='cart-card__price'>$${item.FinalPrice}</p>
// // </li>`;

// //   return newItem;
// // }

// renderCartContents();
//updateCartCount();
