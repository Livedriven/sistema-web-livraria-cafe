import { formatCurrency } from "../utils/formatters";

export function createProductCard(product, { onAddToCart = () => { }, onBuyNow = () => { } } = {}) {
    // Cria o elemento principal <article>
    const article = document.createElement('article');
    article.classList.add('product-card');

    // --- Seção Media ---
    const mediaDiv = document.createElement('div');
    mediaDiv.classList.add('product-card__media');

    if (product.img) {
        const img = document.createElement('img');
        img.classList.add('product-card__image');
        img.alt = product.name;
        img.src = product.img;

        mediaDiv.appendChild(img);
    } else {
        mediaDiv.classList.remove("product-card__media");
        mediaDiv.classList.add("product-card__image-fallback");

        const span = document.createElement("span");
        span.classList.add("material-symbols-outlined", "product-card__fallback-icon");
        span.textContent = 'menu_book';

        mediaDiv.appendChild(span);
    }

    // --- Seção Body ---
    const bodyDiv = document.createElement('div');
    bodyDiv.classList.add('product-card__body');

    // Conteúdo (Título e Descrição)
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('product-card__content');

    const title = document.createElement('h3');
    title.classList.add('product-card__title');
    title.textContent = product.name;

    const description = document.createElement('p');
    description.classList.add('product-card__description');
    description.textContent = product.littleDescription;

    contentDiv.appendChild(title);
    contentDiv.appendChild(description);

    // --- Footer (Preço e Botões) ---
    const footerDiv = document.createElement('div');
    footerDiv.classList.add('product-card__footer');

    const price = document.createElement('p');
    price.classList.add('product-card__price');
    price.textContent = formatCurrency(product.price)

    //botão: Ver produto
    const viewButton = document.createElement('a');
    viewButton.href = `./product-detail.html?id=${product.id}`;

    const button = document.createElement('button')
    button.classList.add('product-card__button');
    button.setAttribute('type', 'button');
    button.textContent = 'Ver produto';
    viewButton.appendChild(button)

    // Botão: Comprar 
    const buyButton = document.createElement('button');
    buyButton.classList.add('product-card__button');
    buyButton.setAttribute('type', 'button');
    buyButton.textContent = 'Comprar';

    buyButton.addEventListener("click", () => {
        onBuyNow(product);
    });

    const cartButton = document.createElement('button');
    cartButton.classList.add('product-card__button');
    cartButton.setAttribute('type', 'button');
    cartButton.textContent = 'Adicionar ao Carrinho';

    cartButton.addEventListener("click", () => {
        onAddToCart(product);
    });

    // Adiciona os elementos ao footer
    footerDiv.appendChild(price);
    footerDiv.appendChild(viewButton);
    footerDiv.appendChild(buyButton);
    footerDiv.appendChild(cartButton)

    // --- Montagem Final ---
    bodyDiv.appendChild(contentDiv);
    bodyDiv.appendChild(footerDiv);

    article.appendChild(mediaDiv);
    article.appendChild(bodyDiv);

    return article;
}