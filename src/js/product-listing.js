import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { getParam, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const category = getParam('category');
const dataSource = new ProductData();
const listElement = document.querySelector('.product-list');
const title = document.querySelector('.product-listing-title');

if (category) {
  const categoryName = category.replace('-', ' ');
  title.textContent = `Top Products: ${categoryName.charAt(0).toUpperCase()}${categoryName.slice(1)}`;
  const productList = new ProductList(category, dataSource, listElement);
  productList.init();
}
