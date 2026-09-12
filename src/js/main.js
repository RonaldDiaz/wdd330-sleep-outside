import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const category = 'tents';
const listContainer = document.querySelector('.product-list');
const productData = new ProductData(category);
const productList = new ProductList(category, productData, listContainer);
productList.init();