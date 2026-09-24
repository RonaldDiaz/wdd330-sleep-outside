import CheckoutProcess from './CheckoutProcess.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();
const checkoutProcess = new CheckoutProcess(
    document.getElementById('subtotal'),
    document.getElementById('tax'),
    document.getElementById('shipping'),
    document.getElementById('total')
);
checkoutProcess.init();

const zipElement = document.getElementById('zip');
zipElement.addEventListener('input', () => {
    if (zipElement.value.length === 5) {
        checkoutProcess.calculateAndDisplayTheRest();
    }
    else {
        checkoutProcess.clearTheRest();
    }
});