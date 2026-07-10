import { findProductById, getProductIdFromUrl } from "../services/productService";
import { formatCurrency } from "../utils/formatters";
import { addToCart } from "../services/cartService";
import Swal from "sweetalert2";

export function initProductDetail(products) {
    const productId = getProductIdFromUrl();
    const product = findProductById(products, productId);

    if (!product) {
        renderProductNotFound();
        return;
    }

    renderProductDetail(product);
    setupProductActions(product);
}



function renderProductDetail(product) {
    renderProductImg(product)

    const currentProduct = document.querySelector("#currentProduct");
    currentProduct.textContent = product.name;

    const productName = document.querySelector("#product-title");
    productName.textContent = product.name;

    const productPrice = document.querySelector("#product-price");
    productPrice.textContent = formatCurrency(product.price);

    const description = document.querySelector("#product-description");
    description.textContent = getProductDescription(product.description)
};

function renderProductNotFound() {
    const main = document.querySelector(".product-page");

    if (!main) return;

    main.innerHTML = "";

    main.innerHTML = `
        <section class="product-detail product-detail--empty">
            <div class="product-detail__empty">
                <span class="material-symbols-outlined product-detail__empty-icon">
                    search_off
                </span>

                <h1 class="product-detail__title">
                    Produto não encontrado
                </h1>

                <p class="product-detail__description">
                    O produto que você tentou acessar não existe ou foi removido.
                </p>

                <a 
                    class="product-detail__button product-detail__button--primary" 
                    href="./products.html"
                >
                    Voltar para produtos
                </a>
            </div>
        </section>
    `;
}

function renderProductImg(product) {
    const div = document.querySelector(".product-gallery")

    if (!div) return;

    if (product.img) {
        const figure = document.createElement("figure");
        figure.classList.add("product-gallery__image-wrapper");

        const img = document.createElement("img");
        img.classList.add("product-gallery__image");
        img.src = product.img;
        img.alt = product.name;

        figure.appendChild(img);
        div.appendChild(figure)
        return;
    }

    const figure = document.createElement("figure");

    figure.classList.add("product-card__image-fallback");
    const span = document.createElement("span");
    span.classList.add("material-symbols-outlined", "product-card__fallback-icon");
    span.textContent = 'menu_book';

    figure.appendChild(span);
    div.appendChild(figure);
}

function setupProductActions(product) {
    const btnAddToCart = document.querySelector("#btnAddToCart");
    const btnBuyProduct = document.querySelector("#btnBuyProduct");
    const quantityInput = document.querySelector(".quantity-control__input");
    const decreasedQuantity = document.querySelector("#decreasedQuantity");
    const addQuantity = document.querySelector("#addQuantity");

    if(decreasedQuantity && addQuantity){
        decreasedQuantity.addEventListener("click", () => {
            let quantity = Number(quantityInput.value) || 1;

            if(quantity > 1){
                quantity -= 1;
            }
            
            quantityInput.value = quantity;
        })

        addQuantity.addEventListener('click', () => {
            let quantity = Number(quantityInput.value) || 1;

            quantity ++;
            quantityInput.value = quantity;
        })
    }

    if (btnAddToCart) {
        btnAddToCart.addEventListener("click", () => {
            const quantity = Number(quantityInput.value) || 1;

            addToCart(product, quantity);

            Swal.fire({
                icon: "success",
                title: "Produto adicionado",
                text: `${product.name} foi adicionado ao carrinho.`,
                timer: 1200,
                showConfirmButton: false
            });
        });
    }

    if (btnBuyProduct) {
        btnBuyProduct.addEventListener("click", () => {
            const quantity = Number(quantityInput.value) || 1;

            addToCart(product, quantity);

            window.location.href = "./cart.html";
        });
    }
}

function getProductDescription(product) {
    if (product.description) {
        return product.description;
    }

    return "Este produto faz parte da curadoria da Capítulo & Café, pensado para leitores que gostam de unir boas histórias, conforto e uma experiência acolhedora.";
}