"use strict";

const basket = {};

const products = getProductsObject();

const basketEl = document.querySelector(".basket");

const basketListEl = document.querySelector(".basketList");

const basketCounterEl = document.querySelector(".cartIconWrap span");

const basketTotalValueEl = document.querySelector(".basketTotalValue");

document.querySelector(".cartIconWrap").addEventListener("click", () => {
    basketEl.classList.toggle("hidden");
});

document.querySelector(".featuredItems").addEventListener("click", (event) => {
    const addToCartEl = event.target.closest(".addToCart");
    if (!addToCartEl) {
        return;
    }
    add(addToCartEl.dataset.id);
    renderBasketContent();
});


basketEl.addEventListener("click", (event) => {
    if (!event.target.classList.contains("productRemove")) {
        return;
    }
    remove(event.target.closest(".basketRow").dataset.id);
    renderBasketContent();
});

function add(id) {
    if (!(id in basket)) {
        basket[id] = {
            id: id,
            name: products[id].name,
            price: products[id].price,
            count: 0,
        };
    }
    basket[id].count++;
}

function remove(id) {
    if (basket[id].count <= 1) {
        delete basket[id];
    } else {
        basket[id].count--;
    }
}

function renderBasketContent() {
    basketListEl.innerHTML = Object.values(basket).reduce(
        (acc, product) => acc + getBasketProductMarkup(product),
        ""
    );
    basketCounterEl.textContent = BasketCount().toString();
    basketTotalValueEl.textContent = BasketPrice().toFixed(2);
}

function BasketCount() {
    return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}

function BasketPrice() {
    return Object.values(basket).reduce(
        (acc, product) => acc + product.price * product.count,
        0
    );
}

function getBasketProductMarkup(product) {
    return `
    <div class="basketRow" data-id="${product.id}">
      <div>${product.name}</div>
      <div>
        <span class="productCount">${product.count}</span> шт.
      </div>
      <div>${product.price} ₽</div>
      <div>
        <span class="productTotalRow">
          ${(product.price * product.count).toFixed(2)} ₽
        </span>
      </div>
      <div><button class="productRemove">-</button></div>
    </div>
  `;
}

function addNumberProductsBasket {

}

function removeNumberProductsBasket {

}