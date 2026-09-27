import { renderListWithTemplate, getCategoryLabel } from './utils.mjs';

function productCardTemplate(product) {
  const finalPrice = Number(product.FinalPrice);
  const suggestedRetailPrice = Number(product.SuggestedRetailPrice);
  const isDiscounted = finalPrice < suggestedRetailPrice;
  const discountPercentage = isDiscounted
    ? Math.round(((suggestedRetailPrice - finalPrice) / suggestedRetailPrice) * 100)
    : 0;

    return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium.replace(/^\.\.\//, '')}" alt="Image of ${product.Name}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
          ${isDiscounted ? `<p class="product-card__discount">-${discountPercentage}% off</p>` : ''}
          <p class="product-card__price">$${product.FinalPrice}</p>
          ${isDiscounted ? `<p class="product-card__retail-price">$${product.SuggestedRetailPrice}</p>` : ''}
      </a>
    </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement, searchTerm = null) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = [];
    this.currentSort = 'name';
    this.searchTerm = searchTerm;
  }

  async init() {
    const list = this.searchTerm
      ? await this.dataSource.searchProducts(this.searchTerm)
      : await this.dataSource.getData(this.category);

    this.products = list;
    this.renderList();
    this.renderBreadcrumb(list.length);
  }

  sortProducts(list, sortBy = this.currentSort) {
    const sortedProducts = [...list];

    switch (sortBy) {
      case 'price':
        return sortedProducts.sort((a, b) => Number(a.FinalPrice) - Number(b.FinalPrice));
      case 'name':
      default:
        return sortedProducts.sort((a, b) =>
          (a.NameWithoutBrand || '').localeCompare(b.NameWithoutBrand || '')
        );
    }
  }

  renderList() {
    const sortedProducts = this.sortProducts(this.products);
    renderListWithTemplate(productCardTemplate, this.listElement, sortedProducts, 'afterbegin', true);

    if (!sortedProducts.length) {
      this.listElement.innerHTML = '<li class="empty-results">No products found.</li>';
    }
  }

  setSort(sortBy) {
    this.currentSort = sortBy;
    if (this.products.length) {
      this.renderList();
    }
  }

  renderBreadcrumb(count) {
    const breadcrumbElement = document.getElementById('breadcrumb');
    if (breadcrumbElement) {
      const label = this.searchTerm
        ? `Search Results for "${this.searchTerm}"`
        : getCategoryLabel(this.category);
      breadcrumbElement.innerHTML = `<strong>${label}: ${count} items </strong>`;
    }
  }
}
