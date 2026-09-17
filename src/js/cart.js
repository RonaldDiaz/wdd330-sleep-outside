import ShoppingCart from './ShoppingCart.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const container = document.querySelector('.product-list');
const shoppingCart = new ShoppingCart(container);
shoppingCart.init();
