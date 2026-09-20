import { renderListWithTemplate, renderWithTemplate } from './utils.mjs';

export default class AlertManager {
  constructor() {
    this.container = document.querySelector('main');
    this.template = document.createElement('template');
    this.template.classList.add('alert-container');
    this.template.innerHTML = alertTemplate;
  }

  show(message, type = 'success', duration = 5000) {
    const clone = this.template.content.cloneNode(true);
    const [toastItem, toastMessage, closeButton] = clone.querySelectorAll('div, p, button');
    toastItem.style.backgroundColor = alertColor(type);
    toastMessage.textContent = message;
    
    this.container.appendChild(clone);
    
    setTimeout(() => {
        toastItem.classList.add('show');
    }, 20);
    
    const autoCloseTimer = setTimeout(() => {
        this.dismiss(toastItem);
    }, duration);

    closeButton.addEventListener('click', () => {
        clearTimeout(autoCloseTimer);
        this.dismiss(toastItem);
    });
  }

  displayAlerts() {
    const alertsArray = this.alerts.mainAlerts;
    if (alertsArray.length !== 0) {
      const section = document.createElement('div');
      section.classList.add('alert-container');
      document.querySelector('main').insertAdjacentElement('afterbegin', section);
      this.renderList(alertsArray, section);
    }
  }

  renderList(list, container) {
    renderListWithTemplate(alertTemplate, container, list, 'afterbegin', true);
  }
}

const alertTemplate =
    `<div class="alert-item">
      <p class="alert-message"></p>
      <button type="button">&times;</button>
    </div>`

function alertColor(type) {
  switch (type) {
    case 'success': return '#525b0f'
    case 'failure': return '#8a470c'
    case 'warning': return '#f0a868'
    default: return '#303030'
  }
}

export class Toast {
    constructor(container) {
        this.container = container;
        const template = document.createElement('template');
        template.innerHTML = `
            <div class="toast-item">
                <p class="toast-message"></p>
                <button type="button" class="close-toast">&times;</button>
            </div>`;
        this.template = template;
    }

    show(message, duration = 5000) {
        const clone = this.template.content.cloneNode(true);
        const [toastItem, toastMessage, closeButton] = clone.querySelectorAll('div, p, button');
        toastMessage.textContent = message;
        
        this.container.appendChild(clone);
        
        setTimeout(() => {
            toastItem.classList.add('show');
        }, 20);
        
        const autoCloseTimer = setTimeout(() => {
            this.dismiss(toastItem);
        }, duration);

        closeButton.addEventListener('click', () => {
            clearTimeout(autoCloseTimer);
            this.dismiss(toastItem);
        });
    }

    dismiss(toastItem) {
        toastItem.classList.remove('show');
        setTimeout(() => {
            toastItem.remove();
        }, 400);
    }
}
