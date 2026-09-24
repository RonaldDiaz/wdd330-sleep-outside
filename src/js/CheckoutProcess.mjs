import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(subtotalElement, taxElement, shippingElement, totalElement) {
        this.subtotalElement = subtotalElement;
        this.taxElement = taxElement;
        this.shippingElement = shippingElement;
        this.totalElement = totalElement;
        this.subtotal = 0;
        this.tax = 0;
        this.shipping = 0;
        this.total = 0;
        this.itemCount = 0;
    }

    init() {
        this.calculateAndDisplaySubtotal()
    }

    calculateAndDisplaySubtotal() {
        const cartItems = getLocalStorage('so-cart') || [];
        this.subtotal = cartItems.reduce((total, item) => total + item.FinalPrice * (item.Quantity || 1), 0);
        this.itemCount = cartItems.reduce((total, item) => total + (item.Quantity || 1), 0);
   
        this.subtotalElement.textContent = `$${this.subtotal.toFixed(2)}`;
    }

    calculateAndDisplayTheRest() {
        this.tax = this.subtotal * 0.06;
        this.taxElement.textContent = `$${this.tax.toFixed(2)}`;

        this.shipping = (this.itemCount - 1) * 2 + 10;
        this.shippingElement.textContent = `$${this.shipping.toFixed(2)}`;

        this.total = this.subtotal + this.tax + this.shipping;
        this.totalElement.textContent = `$${this.total.toFixed(2)}`;
    }

    clearTheRest() {
        this.taxElement.textContent = '';
        this.shippingElement.textContent = '';
        this.totalElement.textContent = '';
    }
}