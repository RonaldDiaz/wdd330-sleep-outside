import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import Alert from './Alert';

const alerts = new Alert();
alerts.init();

const product = new ProductData('tents');
const productList = new ProductList(
  'tents',
  product,
  document.querySelector('.product-list'),
);
productList.init();
