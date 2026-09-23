import { convertToJson } from './utils.mjs';

export default class Alert {
  constructor() {
    this.alerts = [];
  }

  getSection() {
    let section = document.querySelector('.alert-list');
    if (!section) {
      section = document.createElement('section');
      section.classList.add('alert-list');
    }
    return section;
  }

  showMessage(message, options = {}) {
    const {
      background = '#2d6a4f',
      color = '#ffffff',
      duration = 3500,
    } = options;

    const section = this.getSection();
    const mainElement = document.querySelector('main');

    if (mainElement) {
      const hero = mainElement.querySelector('.hero');
      if (hero && !section.isConnected) {
        mainElement.insertBefore(section, hero);
      } else if (!section.isConnected) {
        mainElement.prepend(section);
      }
    } else if (!section.isConnected) {
      document.body.prepend(section);
    }

    const alert = document.createElement('div');
    alert.classList.add('alert-item');
    alert.setAttribute('role', 'alert');
    alert.textContent = message;
    alert.style.backgroundColor = background;
    alert.style.color = color;

    section.appendChild(alert);

    requestAnimationFrame(() => {
      alert.classList.add('alert-item--visible');
    });

    setTimeout(() => {
      alert.classList.add('alert-item--hidden');
      setTimeout(() => {
        alert.remove();

        if (!section.querySelector('.alert-item')) {
          section.remove();
        }
      }, 250);
    }, duration);
  }

  async init() {
    try {
      const data = await fetch('/json/alerts.json');
      this.alerts = await convertToJson(data);
      this.displayAlerts();
    } catch (error) {
      console.warn('Unable to load alerts', error);
    }
  }

  displayAlerts() {
    const alertsArray = this.alerts.mainAlerts || [];
    if (!alertsArray.length) {
      return;
    }

    const section = this.getSection();
    const mainElement = document.querySelector('main');

    if (mainElement) {
      const hero = mainElement.querySelector('.hero');
      if (hero) {
        mainElement.insertBefore(section, hero);
      } else {
        mainElement.prepend(section);
      }
    } else {
      document.body.prepend(section);
    }

    alertsArray.forEach((mainAlert) => {
      this.showMessage(mainAlert.message, {
        background: mainAlert.background || '#1d4f91',
        color: mainAlert.color || '#ffffff',
      });
    });
  }
}
