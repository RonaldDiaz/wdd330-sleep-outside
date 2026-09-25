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

export function updateCartCount() {
    const cartItems = getLocalStorage('so-cart') || [];
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        const totalCount = cartItems.reduce((total, item) => total + (item.Quantity || 1), 0);
        countElement.textContent = totalCount;
    }
}

export async function convertToJson(res) {
    if (res.ok) {
        return res.json();
    }
    const errorResponse = await res.json().catch(() => ({ error: 'Bad Response' }));
    throw { message: errorResponse };
}

export function getCategoryLabel(category) {
    switch (category) {
        case 'tents':
            return 'Tents';
        case 'sleeping-bags':
            return 'Sleeping Bags';
        case 'backpacks':
            return 'Backpacks';
        case 'hammocks':
            return 'Hammocks';
        default:
            return category;
    }
}