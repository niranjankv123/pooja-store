import { useState, useEffect, useCallback } from 'react';
import { type Product } from '../types';
import { api } from '../services/api';

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const data = await api.getProducts();
            setProducts(data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to load products');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const addProduct = async (productData: Partial<Product>) => {
        try {
            await api.addProduct(productData);
            await fetchProducts();
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const updateProduct = async (id: string, productData: Partial<Product>) => {
        try {
            await api.updateProduct(id, productData);
            await fetchProducts();
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const deleteProduct = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return false;
        try {
            await api.deleteProduct(id);
            await fetchProducts();
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    return {
        products,
        loading,
        error,
        refreshProducts: fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct
    };
};
