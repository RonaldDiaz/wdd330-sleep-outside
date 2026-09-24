import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

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
        this.list = getLocalStorage('so-cart') || [];
    }

    init() {
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
        // get the form element data by the form name
        // convert the form data to a JSON order object using the formDataToJSON function
        const order = formDataToJSON(form);
        order.orderDate = new Date().toISOString();
        order.orderTotal = this.orderTotal;
        order.tax = this.tax;
        order.shipping = this.shipping;
        order.items = packageItems(this.list);
        console.log(order);

        try {
            const response = await services.checkout(order);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }
}

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
    const simplifiedItems = items.map((item) => {
        console.log(item);
        return {
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: 1,
        };
    });
    return simplifiedItems;
}

// takes a form element and returns an object where the key is the "name" of the form input.
function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
        convertedJSON = {};

    formData.forEach(function (value, key) {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}

