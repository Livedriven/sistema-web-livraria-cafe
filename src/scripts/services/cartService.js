import { save, getProducts } from "./storage";

const CART_KEY = "cart";

export function getCart() {
    return getProducts(CART_KEY, []);
}

export function saveCart(cart) {
    save(CART_KEY, cart);
}

export function addToCart(product, quantity = 1) {
    const cart = getCart();

    const productQuantity = Math.max(1, Number(quantity) || 1);

    const productAlreadyInCart = cart.find(item => item.id === product.id);

    if (productAlreadyInCart) {
        productAlreadyInCart.quantity += productQuantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            img: product.img,
            littleDescription: product.littleDescription,
            price: Number(product.price),
            quantity: productQuantity
        });
    }

    saveCart(cart);

    return cart;
}

export function removeFromCart(productId) {
    const cart = getCart();

    const updatedCart = cart.filter(item => item.id !== productId);

    saveCart(updatedCart);

    return updatedCart;
}

export function clearCart() {
    saveCart([]);
    return [];
}

export function increaseProductQuantity(productId) {
    const cart = getCart();

    const product = cart.find(item => item.id === productId);

    if (product) {
        product.quantity += 1;
    }

    saveCart(cart);

    return cart;
}

export function decreaseProductQuantity(productId) {
    const cart = getCart();

    const product = cart.find(item => item.id === productId);

    if (product && product.quantity > 1) {
        product.quantity -= 1;
        saveCart(cart);
        return cart;
    }

    const updatedCart = cart.filter(item => item.id !== productId);

    saveCart(updatedCart);

    return updatedCart;
}

export function countCartItems() {
    const cart = getCart();

    return cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);
}

export function calculateCartTotal() {
    const cart = getCart();

    return cart.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);
}