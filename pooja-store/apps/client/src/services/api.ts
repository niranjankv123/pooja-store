import { type Product } from '../types';

const API_URL = import.meta.env.VITE_API_URL || '';

export const api = {
    getProducts: async (): Promise<Product[]> => {
        const res = await fetch(`${API_URL}/api/products`);
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
    },

    addProduct: async (product: Partial<Product>): Promise<Product> => {
        const res = await fetch(`${API_URL}/api/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        });
        if (!res.ok) throw new Error('Failed to add product');
        const data = await res.json();
        return data.product;
    },

    updateProduct: async (id: string, product: Partial<Product>): Promise<Product> => {
        const res = await fetch(`${API_URL}/api/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        });
        if (!res.ok) throw new Error('Failed to update product');
        const data = await res.json();
        return data.product;
    },

    deleteProduct: async (id: string): Promise<void> => {
        const res = await fetch(`${API_URL}/api/products/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete product');
    },

    login: async (username: string, password: string): Promise<boolean> => {
        const res = await fetch(`${API_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        if (!res.ok) return false;
        const data = await res.json();
        return data.success;
    }
};
