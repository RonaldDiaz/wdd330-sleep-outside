import { setLocalStorage, getLocalStorage, updateCartCount } from './utils.mjs';

export function getProductDiscount(product) {
  const finalPrice = Number(product.FinalPrice);
  const suggestedRetailPrice = Number(product.SuggestedRetailPrice);
  const isDiscounted = finalPrice < suggestedRetailPrice;
  const discountAmount = isDiscounted ? suggestedRetailPrice - finalPrice : 0;
  const discountPercentage = isDiscounted
    ? Math.round((discountAmount / suggestedRetailPrice) * 100)
    : 0;

  return {
    isDiscounted,
    discountAmount: Number(discountAmount.toFixed(2)),
    discountPercentage,
  };
}

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
        const existingProduct = existingCart.find(item => item.Id === this.productId);
        if (existingProduct) {
            existingProduct.Quantity = (existingProduct.Quantity || 1) + 1;
        } else {
            this.product.Quantity = 1;
            existingCart.push(this.product);
        }
        setLocalStorage('so-cart', existingCart);
        updateCartCount();
    }

    renderProductDetails() {
        const template = document.getElementById('productTemplate');
        const clone = template.content.cloneNode(true);
        const brand = clone.querySelector('h3');
        const name = clone.querySelector('h2');
        const image = clone.querySelector('img');
        const price = clone.querySelector('.product-card__price');
        const discount = clone.querySelector('.product-card__discount');
        const retailPrice = clone.querySelector('.product-card__retail-price');
        const color = clone.querySelector('.product__color');
        const description = clone.querySelector('.product__description');
        const { isDiscounted, discountAmount, discountPercentage } = getProductDiscount(this.product);

        brand.textContent = this.product.Brand.Name;
        name.textContent = this.product.NameWithoutBrand;
        image.src = this.product.Images.PrimaryLarge;
        image.alt = this.product.NameWithoutBrand;
        price.textContent = `$${this.product.FinalPrice}`;
        color.textContent = this.product.Colors[0].ColorName;
        description.innerHTML = this.product.DescriptionHtmlSimple;

        if (isDiscounted) {
            discount.textContent = `Save $${discountAmount.toFixed(2)} (${discountPercentage}% off)`;
            retailPrice.textContent = `Regular price: $${this.product.SuggestedRetailPrice}`;
        } else {
            discount.style.display = 'none';
            retailPrice.style.display = 'none';
        }

        const container = document.querySelector('.product-detail');
        container.appendChild(clone);
    }
}