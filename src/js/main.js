import Alert from './Alert';
import { updateCartCount, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const alerts = new Alert();
alerts.init();

updateCartCount();
