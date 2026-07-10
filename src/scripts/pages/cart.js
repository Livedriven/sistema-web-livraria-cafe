import {
    getCart,
    removeFromCart,
    increaseProductQuantity,
    decreaseProductQuantity,
    calculateCartTotal,
    clearCart
} from "../services/cartService";

import { formatCurrency } from "../utils/formatters";
import Swal from "sweetalert2";

export function initCart() {
    renderCart();
    setupCheckoutButton();
    setupCouponForm();
}

function renderCart() {
    const main = document.querySelector('#main-cart')
    const cartItemsContainer = document.querySelector("#cartItems");
    const cartSubtotal = document.querySelector("#cartSubtotal");
    const cartTotal = document.querySelector("#cartTotal");

    if (!cartItemsContainer || !cartSubtotal || !cartTotal) return;

    const cart = getCart();

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        renderEmptyCart(main);
        cartSubtotal.textContent = formatCurrency(0);
        cartTotal.textContent = formatCurrency(0);
        return;
    }

    cart.forEach(item => {
        const cartItem = createCartItem(item);
        cartItemsContainer.appendChild(cartItem);
    });

    const total = calculateCartTotal();

    cartSubtotal.textContent = formatCurrency(total);
    cartTotal.textContent = formatCurrency(total);
}



function createCartItem(item) {
    const template = document.querySelector("#cartItemTemplate");
    const clone = template.content.cloneNode(true);

    const article = clone.querySelector(".cart-item");
    const imageBox = clone.querySelector(".cart-item__image-box");
    const image = clone.querySelector(".cart-item__image");
    const category = clone.querySelector('[data-cart-field="category"]');
    const name = clone.querySelector('[data-cart-field="name"]');
    const price = clone.querySelector('[data-cart-field="price"]');
    const quantity = clone.querySelector('[data-cart-field="quantity"]');
    const subtotal = clone.querySelector('[data-cart-field="subtotal"]');
    const btnRemove = clone.querySelector(".cart-item__remove-button");
    const btnDecrease = clone.querySelector('[data-cart-action="decrease"]');
    const btnIncrease = clone.querySelector('[data-cart-action="increase"]');

    article.dataset.productId = item.id;

    if (item.img) {
        image.src = item.img;
        image.alt = item.name;
    } else {
        imageBox.innerHTML = `
        <span class="material-symbols-outlined cart-item__fallback-icon">
            menu_book
        </span>
    `;
    }

    category.textContent = "Produto selecionado";
    name.textContent = item.name;
    price.textContent = formatCurrency(item.price);
    quantity.textContent = item.quantity;
    subtotal.textContent = formatCurrency(item.price * item.quantity);

    btnRemove.addEventListener("click", () => {
        removeFromCart(item.id);
        renderCart();

        Swal.fire({
            icon: "success",
            title: "Produto removido",
            timer: 1000,
            showConfirmButton: false
        });
    });

    btnDecrease.addEventListener("click", () => {
        decreaseProductQuantity(item.id);
        renderCart();
    });

    btnIncrease.addEventListener("click", () => {
        increaseProductQuantity(item.id);
        renderCart();
    });

    return clone;
}

function renderEmptyCart(container) {
    if (!container) return;

    container.innerHTML = "";
    container.innerHTML = `
    
        <div class="empty-cart-page">
                <section class="empty-cart" aria-labelledby="emptyCartTitle">
                <div class="empty-cart__texture" aria-hidden="true"></div>

                <div class="empty-cart__icon-box">
                    <span class="empty-cart__icon material-symbols-outlined" aria-hidden="true">menu_book</span>
                </div>

                <h1 class="empty-cart__title" id="emptyCartTitle">
                    Seu carrinho está vazio
                </h1>

                <p class="empty-cart__description">
                    Parece que você ainda não escolheu seu próximo capítulo. Explore nossa seleção de livros curados e cafés artesanais para começar sua jornada.
                </p>

                <a class="empty-cart__button" href="./products.html">
                    Ver Produtos
                </a>

                <div class="empty-cart__bookmark" aria-hidden="true"></div>
            </section>
        </div>
    `;
}

function setupCheckoutButton() {
    const checkoutButton = document.querySelector("#checkoutButton");

    if (!checkoutButton) return;

    checkoutButton.addEventListener("click", () => {
        const cart = getCart();

        if (cart.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "Carrinho vazio",
                text: "Adicione produtos antes de finalizar a compra."
            });

            return;
        }

        Swal.fire({
            icon: "success",
            title: "Compra finalizada",
            text: "Pedido registrado com sucesso."
        }).then(() => {
            clearCart();
            renderCart();
        });
    });
}

function setupCouponForm() {
    const couponForm = document.querySelector("#couponForm");

    if (!couponForm) return;

    couponForm.addEventListener("submit", (event) => {
        event.preventDefault();

        Swal.fire({
            icon: "info",
            title: "Cupom indisponível",
            text: "A funcionalidade de cupom ainda não foi implementada."
        });
    });
}