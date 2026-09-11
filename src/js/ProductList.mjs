import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    const template =
        `<li class="product-card">
        <a href="product_pages/?product=${product.Id}">
            <img
                src="${product.Image}"
                alt="${product.Name}"
            />
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>
            <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
    </li>`
    return template;
}

export default class ProductList {
    /* listElement contains the parent element to insert products into (a UL element, 
       since the template uses LI) */
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        const productList = await this.dataSource.getData();
        this.renderList(productList);
    }
    renderList(list) {
        // const listElementArray = list.map(productCardTemplate);
        // this.listElement.insertAdjacentHTML('afterbegin', listElementArray.join(''));
        renderListWithTemplate(productCardTemplate, this.listElement, list)
    }
}
