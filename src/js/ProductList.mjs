import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
        const finalPrice = Number(product.FinalPrice);
        const suggestedRetailPrice = Number(product.SuggestedRetailPrice);
        const isDiscounted = finalPrice < suggestedRetailPrice;
        const discountPercentage = isDiscounted
                ? Math.round(((suggestedRetailPrice - finalPrice) / suggestedRetailPrice) * 100)
                : 0;

    return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="${product.Image.replace(/^\.\.\//, '')}" alt="Image of ${product.Name}">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
            ${isDiscounted ? `<p class="product-card__discount">-${discountPercentage}% off</p>` : ''}
            <p class="product-card__price">$${product.FinalPrice}</p>
            ${isDiscounted ? `<p class="product-card__retail-price">$${product.SuggestedRetailPrice}</p>` : ''}
    </a>
  </li>`;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData();
        this.renderList(list);
    }
    
    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list, 'afterbegin', true);
    }
}
