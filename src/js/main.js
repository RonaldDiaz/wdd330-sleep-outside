import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import Alert from './Alert';

const dataSource = new ProductData('tents');
const listElement = document.querySelector('.product-list');
const alerts = new Alert();
alerts.init();

const myList = new ProductData('tents', dataSource, listElement);
myList.init();
