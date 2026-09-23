import Alert from './Alert.js';
import { setLocalStorage, getLocalStorage, updateCartCount, getCategoryLabel } from './utils.mjs';

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
        this.renderBreadcrumb();
        document.getElementById('addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));
    }

    addProductToCart() {
        if (!this.product || !this.product.Id) {
            const alert = new Alert();
            alert.showMessage('Unable to add this item to the cart right now.', {
                background: '#b42318',
                color: '#ffffff',
                duration: 3000,
            });
            return;
        }

        const existingCart = Array.isArray(getLocalStorage('so-cart')) ? getLocalStorage('so-cart') : [];
        const existingProduct = existingCart.find(item => item.Id === this.productId);

        if (existingProduct) {
            existingProduct.Quantity = (existingProduct.Quantity || 1) + 1;
        } else {
            const itemToAdd = {
                ...this.product,
                Quantity: 1,
                Name: this.product.NameWithoutBrand || this.product.Name || 'Product',
                Images: this.product.Images || { PrimarySmall: '/images/tent.svg' },
                Colors: this.product.Colors?.length ? this.product.Colors : [{ ColorName: 'Default' }],
            };
            existingCart.push(itemToAdd);
        }

        setLocalStorage('so-cart', existingCart);
        updateCartCount();

        const alert = new Alert();
        const productName = this.product.NameWithoutBrand || 'This item';
        alert.showMessage(`Added ${productName} to cart.`, {
            background: '#2d6a4f',
            color: '#ffffff',
            duration: 3000,
        });
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

    renderBreadcrumb() {
        const breadcrumbElement = document.getElementById('breadcrumb');
        if (breadcrumbElement) {
            breadcrumbElement.innerHTML = `<strong>${getCategoryLabel(this.product.Category)}</strong>`;
        }
    }
}