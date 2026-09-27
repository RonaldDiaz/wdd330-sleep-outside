import { loadHeaderFooter, getParam } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';

loadHeaderFooter();

const category = getParam('category');
const searchTerm = getParam('search');
const dataSource = new ExternalServices();
const listElement = document.querySelector('.product-list');
const myList = new ProductList(category, dataSource, listElement, searchTerm);
const sortSelector = document.querySelector('#sort-products');

if (sortSelector) {
  sortSelector.addEventListener('change', (event) => {
    myList.setSort(event.target.value);
  });
}

myList.init();

const topProductsElement = document.getElementById('top-products');
let productType = '';
if (category === 'tents') productType = 'Tents';
else if (category === 'sleeping-bags') productType = 'Sleeping Bags';
else if (category === 'backpacks') productType = 'Backpacks';
else if (category === 'hammocks') productType = 'Hammocks';

if (topProductsElement) {
  topProductsElement.innerText = searchTerm
    ? `Search Results: ${searchTerm}`
    : `Top Products: ${productType}`;
}

const searchInput = document.getElementById('header-search');
if (searchInput && searchTerm) {
  searchInput.value = searchTerm;
}
