import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                home: resolve(__dirname, 'src/pages/home.html'),
                about: resolve(__dirname, 'src/pages/about.html'),
                signup: resolve(__dirname, 'src/pages/signup.html'),
                contact: resolve(__dirname, 'src/pages/contact.html'),
                cart: resolve(__dirname, 'src/pages/cart.html'),
                'product-detail': resolve(__dirname, 'src/pages/product-detail.html'),
                products: resolve(__dirname, 'src/pages/products.html'),
            },
        },
    },
});
