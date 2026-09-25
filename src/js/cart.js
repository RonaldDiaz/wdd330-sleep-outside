import ShoppingCart from './ShoppingCart.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const container = document.querySelector('.product-list');
const cartFooterElement = document.querySelector('#cart-footer');
const shoppingCart = new ShoppingCart(container, cartFooterElement);
shoppingCart.init();
