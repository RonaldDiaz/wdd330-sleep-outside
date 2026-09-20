import { getParam, loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';
import AlertManager from './AlertManager';

loadHeaderFooter();

const productId = getParam('product');
const dataSource = new ProductData('tents');
const alertManager = new AlertManager();

const product = new ProductDetails(productId, dataSource, alertManager);
product.init();
