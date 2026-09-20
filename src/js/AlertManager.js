class AlertManager {
  constructor() {
    this.container = this.createAlertContainer();
    this.template = document.createElement('template');
    this.template.innerHTML = alertTemplate;
  }
  
  createAlertContainer() {
    let container = document.createElement('div');
    container.id = 'alertContainer';
    document.body.appendChild(container);
    return container;
  }

  show(message, type = 'info', duration = 5000) {
    const clone = this.template.content.cloneNode(true);
    const [alertItem, alertMessage, closeButton] = clone.querySelectorAll('div, p, button');
    const colors = alertColor(type);
      
    alertMessage.textContent = message;
    alertItem.style.backgroundColor = colors[0];
    alertItem.style.color = colors[1];
      
    this.container.appendChild(clone);
    
    setTimeout(() => {
      alertItem.classList.add('show');
    }, 20);
    
    const autoCloseTimer = setTimeout(() => {
      this.dismiss(alertItem);
    }, duration);

    closeButton.addEventListener('click', () => {
      clearTimeout(autoCloseTimer);
      this.dismiss(alertItem);
    });
  }

  dismiss(alertItem) {
    alertItem.classList.remove('show');
    setTimeout(() => {
      alertItem.remove();
    }, 400);
  }
}

const alertTemplate = 
  `<div class="alert-item">
    <p class="alert-message"></p>
    <button type="button" class="close-alert">&times;</button>
  </div>`;

function alertColor(type) {
  switch (type) {
    case 'success': return ['#4ec956', '#232523'];
    case 'error': return ['#d1452c', '#fff'];
    case 'warning': return ['#f1c70a', '#000'];
    default: return ['#303030', '#fff'];
  }
}

export const alertManager = new AlertManager();