export function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

export function findProductById(products, productId) {
    return products.find(product => product.id === productId);
}