import { createProductCard } from "../components/productCard";
import { addToCart } from "../services/cartService";
import Swal from "sweetalert2";

export function initHome(products) {
    renderHome(products);
}

function renderHome(products) {
    const productListContainer = document.querySelector("#curationContainer");

    if (!productListContainer) return;

    productListContainer.innerHTML = "";

    const demonstration = products.slice(0, 4);

    demonstration.forEach(product => {
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
        }
        );
        productListContainer.appendChild(cardElement);
    });
}