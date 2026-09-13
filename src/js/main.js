import ProductData from './ProductData.mjs';
<<<<<<< HEAD

const dataSource = new ProductData('tents');

function formatCurrency(value) {
  return `$${Number(value).toFixed(2)}`;
}

function isDiscounted(product) {
  return Number(product.FinalPrice) < Number(product.SuggestedRetailPrice);
}

function renderProductCard(product) {
  const discounted = isDiscounted(product);
  const retailPrice = Number(product.SuggestedRetailPrice);
  const finalPrice = Number(product.FinalPrice);
  const savings = retailPrice - finalPrice;

  return `
    <li class="product-card">
      <a href="product_pages/?product=${product.Id}">
        <img src="${product.Image}" alt="${product.NameWithoutBrand}" />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price ${discounted ? 'product-card__price--discounted' : ''}">
          ${formatCurrency(finalPrice)}
          ${discounted ? `<span class="product-card__price-original">${formatCurrency(retailPrice)}</span>` : ''}
        </p>
        ${discounted ? `<p class="product-card__discount">Discounted - Save ${formatCurrency(savings)}</p>` : ''}
      </a>
    </li>
  `;
}

async function init() {
  const products = await dataSource.getData();
  const productList = document.querySelector('#product-list');

  productList.innerHTML = products.map(renderProductCard).join('');
}

init();
=======
import ProductList from './ProductList.mjs';
import Alert from './Alert';
import { updateCartCount } from './utils.mjs';

const dataSource = new ProductData('tents');
const listElement = document.querySelector('.product-list');
const alerts = new Alert();
alerts.init();

const myList = new ProductList('tents', dataSource, listElement);
myList.init();

updateCartCount();
>>>>>>> 2aea27815ab72ef2c3479c4fe6f4ebaff9c00a6b
