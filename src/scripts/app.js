import { save, getProducts, GetUserLog } from "./services/storage";
import { initHome } from "./pages/home";
import { initProducts } from "./pages/products";
import { initProductDetail } from "./pages/product-detail";
import { initCart } from "./pages/cart";

const defaultProducts = [
    {
        id: "6f51c72b-8a32-4d9a-9e14-123456789abc",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOZzNqeKQngZJ92TuJC71avV_rKp-L3PLhDOpSQUxjmUm22W3fj8HFC9sVlEnh5XF8HkzGfe3XYZnIvE2bqmwGKBtYaobduzacWdg3yd59yzS7w5NaDxGwJbtiMKJxdAw6Uvp-KBn2Jv8pIgeo0dg-52y7voEh0Uk2dM5WpWqxIRXVztlQmV65hsCc0hB9IB8CGxDqDsTJVblNgy7IRfOLAG_-DFBfVbogc-G9ncNpDaS-jymuFiV43w",
        name: "O Senhor dos Anéis, Edição de Luxo",
        littleDescription: "Uma edição belíssima para colecionadores e amantes da fantasia épica.",
        description: "",
        price: 189.90
    },
    {
        id: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIQcpf8GJAjd0N1CxRvvFf8cy58IEYX6_FNhDEr-NtgxHKSztj-wHRU3rylG0Aw1pJYHQ_0FXRDPptLe3_oH5pvnM76BPWHLX0gb6OEz89Dlshz-zjIkHgG5i3tlBIf-nu0wL_M_Tbet79YPwt-oxpydB2RBVsVI0a8q_nUjAzpaSLyZZAJYvLzJ1QQVBm5MvLFAbip0PH0xV2DPVuOvLpi9T0n9R3mrm1nFDdgRCBmRr99cA74gke7g",
        name: "Caneca de Cerâmica Artesanal",
        littleDescription: "Feita à mão, perfeita para abraçar enquanto lê nos dias frios.",
        description: "",
        price: 65.00
    },
    {
        id: "f83e20ca-7bb1-412d-bc50-f9e8d7c6b5a4",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDG88uQuoFaKN9Uq2t2zwUdLKbb368fx-KlZcG4x2McDjebgAb7x2ONnD59AANFMH4nbkJF00rw70qK2tLb-Luf93szeHmRzGpJYVEgLNM5wmCKMH01qDDXPzR3R_FX6AHw1a0_Hy1G7Fe0OoZagtjfzBGtlXs_YSKiOw4GJzHtwrEGnEKix5wcm0hpB8y35oixFKJ-o5CvlEsHtbqO1UGFasd7LAUs3_p0vZRQ5s3Jx-WU3LSfrYeeEA",
        name: "Marcador de Página Magnético",
        littleDescription: "Mantenha sua página com estilo. Ilustração exclusiva.",
        description: "",
        price: 25.00
    },
    {
        id: "09876543-21fe-edcb-ba98-76543210fedc",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuABltq8X4LirxOOuRptBRCKoWEBBbZmIN2LKSxzKgjrkVzmEoF5Y8USfExz1HuDMyglWcWdieQgde9oKmpzLBcmyivmo8zGXtAkfwW0s82MfFkY_jPzWTBfyMdd3CBVprT2zyDTRmTxu2BlUKUQ8BeHtmzHpm3RRx-zqSJBudqOzBbahy6HkBQLUyXmtIA0GG2F0YkknJ5fufI1PRvpdTJslb9yzyn9eR3z-a1Tvjb574CeRIlLt5atqQ",
        name: "Café Espresso Blend",
        littleDescription: "Nosso blend exclusivo. Notas de chocolate amargo e caramelo.",
        description: "",
        price: 48.00
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const currentPage = getCurrentPage();

    const protectedPages = [
        "home.html",
        "products.html",
        "product-detail.html",
        "about.html",
        "contact.html",
        "cart.html"
    ];

    if (protectedPages.includes(currentPage)) {
        const user = protectPage();

        if (!user) return;

        renderLoggedUser(user);
    }

    const products = loadProducts();

    const pageControllers = {
        "home.html": () => initHome(products),
        "products.html": () => initProducts(products),
        "product-detail.html": () => initProductDetail(products),
        "cart.html": () => initCart()
    };

    const initPage = pageControllers[currentPage];

    if (initPage) {
        initPage();
    }
});

function protectPage() {
    const user = GetUserLog();

    if (Object.keys(user).length === 0) {
        window.location.href = "../../index.html";
        return null;
    }

    return user;
}

function renderLoggedUser(user) {
    const nameUser = document.querySelector("#nameUser");

    if (!nameUser) return;

    const username = user.usuario;

    nameUser.textContent = `Bem-vindo(a),  ${username}`;
}

function loadProducts() {
    const savedProducts = getProducts("produtos");

    if (Array.isArray(savedProducts) && savedProducts.length > 0) {
        return savedProducts;
    }

    save("produtos", defaultProducts);

    return [...defaultProducts];
}

function getCurrentPage() {
    return window.location.pathname.split("/").pop();
}