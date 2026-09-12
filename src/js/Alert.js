import { convertToJson } from "./utils.mjs";

export default class Alert {
    constructor() {
        this.alerts = [];
    }
    async init() {
        const data = await fetch("../json/alerts.json");
        this.alerts = await convertToJson(data);
        this.displayAlerts();
    }
    displayAlerts() {
        const alertsArray = this.alerts.mainAlerts;
        if (alertsArray.length !== 0) {
            const section = document.createElement('section');
            section.classList.add('alert-list');
            alertsArray.forEach(mainAlert => {
                const alert = document.createElement('p');
                alert.innerText = mainAlert.message;
                alert.style.backgroundColor = mainAlert.background;
                alert.style.color = mainAlert.color;
                section.appendChild(alert);     
            });
            console.log(section);                

            const mainElement = document.querySelector('main');
            console.log(mainElement)
            mainElement.insertAdjacentElement('afterbegin', section);

        }
    }
}