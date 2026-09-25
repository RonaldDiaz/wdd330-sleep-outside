import { loadHeaderFooter, getParam } from "./utils.mjs";
import { notificationManager } from './NotificationManager';

loadHeaderFooter();

notificationManager.show(getParam('message'), 'success');