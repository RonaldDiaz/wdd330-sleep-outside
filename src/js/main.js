import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import Alert from './Alert';
import { updateCartCount, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const dataSource = new ProductData('tents');
const listElement = document.querySelector('.product-list');
const alerts = new Alert();
alerts.init();

const myList = new ProductList('tents', dataSource, listElement);
myList.init();

updateCartCount();
