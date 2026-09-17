// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
    return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
    qs(selector).addEventListener('touchend', (event) => {
        event.preventDefault();
        callback();
    });
    qs(selector).addEventListener('click', callback);
}

export function getParam(key) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(key);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = 'afterbegin', clear = false) {
    if (clear) {
        parentElement.innerHTML = '';
    }
    const htmlStrings = list.map(templateFn);
    parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export function updateCartCount() {
    const cartItems = getLocalStorage('so-cart') || [];
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.textContent = cartItems.length;
    }
}

export function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.innerHTML = template;
    if (callback) {
        callback(data);
    };
}

async function loadTemplate(path) {
    const response = await fetch(path);
    return await response.text();
}

export async function loadHeaderFooter() {
    const header = await loadTemplate('/partials/header.html');
    const footer = await loadTemplate('/partials/footer.html');
    renderWithTemplate(header, document.querySelector('#header'), null, updateCartCount);
    renderWithTemplate(footer, document.querySelector('#footer'));
}

export function convertToJson(res) {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error('Bad Response');
    }
}