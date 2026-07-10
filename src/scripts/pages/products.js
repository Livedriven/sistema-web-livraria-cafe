import { save } from "../services/storage";
import { createProductCard } from "../components/productCard";
import { getInputValue, clearInputValue } from "../utils/validation";
import Swal from "sweetalert2";
import { parsePriceToNumber } from "../utils/formatters";
import { addToCart } from "../services/cartService";

let products = [];
let isSortedAZ = true;

export function initProducts(initialProducts) {
    products = [...initialProducts];

    const formRegisterProduct = document.querySelector("#form-register-product");
    const btnSort = document.querySelector("#btnSort");
    const btnDelete = document.querySelector("#btnDelete");

    renderProducts(products);
    updateProductsCount();

    if (formRegisterProduct) {
        formRegisterProduct.addEventListener("submit", handleRegisterProduct);
    }

    if (btnSort) {
        btnSort.addEventListener("click", () => {
            toggleSortProducts(products);
        });
    }

    if (btnDelete) {
        btnDelete.addEventListener("click", () => {
            const deleted = deleteLast();

            if (!deleted) return;

            renderProducts(products);
            updateProductsCount();
        });
    }
}

function handleRegisterProduct(event) {
    event.preventDefault();

    const name = getInputValue("#product-name");
    const price = parsePriceToNumber(getInputValue("#product-price"));
    const img = getInputValue("#product-image");
    const littleDescription = getInputValue("#short-desc");
    const description = getInputValue("#full-desc");

    const product = {
        id: crypto.randomUUID(),
        img,
        name,
        littleDescription,
        description,
        price
    };

    const productRegistered = registerProduct(product);

    if (!productRegistered) return;

    renderProducts(products);
    updateProductsCount();
    clearProductForm();
}

function registerProduct(product) {
    if (product.name === "") {
        Swal.fire({
            icon: "error",
            title: "Produto sem nome",
            text: "Não é possível cadastrar um produto sem nome",
        });

        return false;
    }

    if (product.littleDescription === "") {
        Swal.fire({
            icon: "error",
            title: "Produto sem descrição curta",
            text: "Não é possível cadastrar um produto sem uma breve descrição",
        });

        return false;
    }

    if (Number.isNaN(product.price) || product.price <= 0) {
        Swal.fire({
            icon: "error",
            title: "Preço inválido",
            text: "Digite um preço válido para o produto.",
        });

        return false;
    }

    products.push(product);
    save("produtos", products);

    return true;
}

function deleteLast() {
    if (products.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Nenhum produto para deletar",
            text: "Não existe produto cadastrado para excluir.",
            timer: 1200
        });

        return false;
    }

    products.pop();
    save("produtos", products);

    Swal.fire({
        icon: "success",
        title: "Deletado com sucesso",
        text: "Último produto deletado com sucesso",
        timer: 1200
    });

    return true;
}

function toggleSortProducts(products) {
    const sortedProducts = [...products];

    sortedProducts.sort((a, b) => {
        const nameA = a.name || "";
        const nameB = b.name || "";

        if (isSortedAZ) {
            return nameA.localeCompare(nameB, "pt-BR", {
                sensitivity: "base"
            });
        }

        return nameB.localeCompare(nameA, "pt-BR", {
            sensitivity: "base"
        });
    });

    renderProducts(sortedProducts);

    isSortedAZ = !isSortedAZ;
}

function renderProducts(products) {
    const productsList = [...products];
    const productsContainer = document.querySelector("#productsContainer");

    if (!productsContainer) return;

    productsContainer.innerHTML = "";

    productsList.forEach(product => {
        const cardElement = createProductCard(product, {
            onAddToCart: (product) => {
                addToCart(product);

                Swal.fire({
                    icon: "success",
                    title: "Produto adicionado",
                    text: `${product.name} foi adicionado ao carrinho.`,
                    timer: 1200,
                    showConfirmButton: false
                });
            },

            onBuyNow: (product) => {
                addToCart(product);
                window.location.href = "./cart.html";
            }
        });
        productsContainer.appendChild(cardElement);
    });
}

function updateProductsCount() {
    const countProducts = document.querySelector("#countProducts");

    if (!countProducts) return;

    countProducts.textContent = products.length;
}

function clearProductForm() {
    clearInputValue("#product-name");
    clearInputValue("#product-price");
    clearInputValue("#product-image");
    clearInputValue("#short-desc");
    clearInputValue("#full-desc");
}