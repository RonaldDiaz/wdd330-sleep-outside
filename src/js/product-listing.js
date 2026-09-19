import { loadHeaderFooter, getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

loadHeaderFooter();

const category = getParam('category');
const dataSource = new ProductData();
const listElement = document.querySelector('.product-list');
const myList = new ProductList(category, dataSource, listElement);
myList.init();

const topProductsElement = document.getElementById('top-products');
let productType = '';
if (category === 'tents') productType = 'Tents';
else if (category === 'sleeping-bags') productType = 'Sleeping Bags';
else if (category === 'backpacks') productType = 'Backpacks';
else if (category === 'hammocks') productType = 'Hammocks';

topProductsElement.innerText = `Top Products: ${productType}`;
