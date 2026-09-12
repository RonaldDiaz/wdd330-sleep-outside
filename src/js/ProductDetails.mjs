import { setLocalStorage, getLocalStorage, updateCartCount } from './utils.mjs';

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init() {
        // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        this.product = await this.dataSource.findProductById(this.productId);
        // the product details are needed before rendering the HTML
        this.renderProductDetails();
        // once the HTML is rendered, add a listener to the Add to Cart button
        // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
        document.getElementById('addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));
    }
    addProductToCart() {
        const existingCart = getLocalStorage('so-cart') || [];
        existingCart.push(this.product);
        setLocalStorage('so-cart', existingCart);
        updateCartCount();
    }
    renderProductDetails() {
        const template = document.getElementById('productTemplate');
        const clone = template.content.cloneNode(true);
        const [brand, name, image, price, color, description] = clone.querySelectorAll('h3, h2, img, p, p, p');

        brand.textContent = this.product.Brand.Name;
        name.textContent = this.product.NameWithoutBrand;
        image.src = this.product.Image;
        image.alt = this.product.NameWithoutBrand;
        price.textContent = this.product.FinalPrice;
        color.textContent = this.product.Colors[0].ColorName;
        description.innerHTML = this.product.DescriptionHtmlSimple;

        const container = document.querySelector('.product-detail');
        container.appendChild(clone);
    }
}