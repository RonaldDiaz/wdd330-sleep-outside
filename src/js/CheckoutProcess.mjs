import { getLocalStorage } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import { notificationManager } from './NotificationManager';

const services = new ExternalServices();

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
        this.list = [];
    }

    init() {
        this.list = getLocalStorage('so-cart') || [];
        this.calculateAndDisplaySubtotal()
    }

    calculateAndDisplaySubtotal() {
        this.subtotal = this.list.reduce((total, item) => total + item.FinalPrice * (item.Quantity || 1), 0);
        this.itemCount = this.list.reduce((total, item) => total + (item.Quantity || 1), 0);

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

    async checkout(form) {
        const order = formDataToJSON(form);
        order.orderDate = new Date().toISOString();
        order.orderTotal = this.total;
        order.tax = this.tax;
        order.shipping = this.shipping;
        order.items = packageItems(this.list);

        try {
            const response = await services.checkout(order);
            notificationManager.show(response.message, 'success');
            form.reset();
        } catch (err) {
            notificationManager.show(`There was a problem with your order: ${Object.values(err.message)}`, 'error');
        }
    }
}

function packageItems(items) {
    const simplifiedItems = items.map((item) => ({
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: 1,
        }));
    return simplifiedItems;
}

function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
        convertedJSON = {};

    formData.forEach(function (value, key) {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}

