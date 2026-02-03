import { useState } from 'react';
import { type Product, type CartItem } from '../types';
import { redirectToWhatsApp } from '../utils/whatsapp';

export const useCart = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

    const addToCart = (product: Product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        // setIsCartOpen(true); // Don't auto open cart
    };

    const removeFromCart = (id: string) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: string, delta: number) => {
        setCart((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    const newQty = Math.max(1, item.quantity + delta);
                    return { ...item, quantity: newQty };
                }
                return item;
            })
        );
    };

    const clearCart = () => setCart([]);

    const openCheckout = () => {
        setIsCartOpen(false);
        setIsCheckoutModalOpen(true);
    };

    const closeCheckout = () => setIsCheckoutModalOpen(false);

    const handleCheckout = async (name: string) => {
        try {
            // Fetch sequential order ID from server
            const response = await fetch('/api/order-id');
            const data = await response.json();
            const orderId = data.orderId || Math.floor(Math.random() * 1000); // Fallback

            redirectToWhatsApp(name, cart, orderId);
            closeCheckout();
            clearCart();
        } catch (error) {
            console.error('Failed to generate order ID:', error);
            // Fallback to random if server fails
            redirectToWhatsApp(name, cart, Math.floor(Math.random() * 1000));
            closeCheckout();
            clearCart();
        }
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return {
        cart,
        total,
        isCartOpen,
        isCheckoutModalOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        openCheckout,
        closeCheckout,
        handleCheckout,
    };
};
