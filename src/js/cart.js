import ShoppingCart from './ShoppingCart.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const container = document.querySelector('.product-list');
const shoppingCart = new ShoppingCart(container);
shoppingCart.init();

const cartFooterElement = document.querySelector('.cart-footer');
const totalAmountElement = document.getElementById('cart-total-sum');
const total = shoppingCart.calculateCartTotal();
if (total > 0) {
    totalAmountElement.innerHTML = `$${total}`;
    cartFooterElement.classList.remove('hide');
} 
else {
    cartFooterElement.classList.add('hide');
}

