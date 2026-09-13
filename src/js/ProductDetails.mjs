<<<<<<< HEAD
import { setLocalStorage, getLocalStorage } from './utils.mjs';
=======
import { setLocalStorage, getLocalStorage, updateCartCount } from './utils.mjs';
>>>>>>> 2aea27815ab72ef2c3479c4fe6f4ebaff9c00a6b

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    
    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
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