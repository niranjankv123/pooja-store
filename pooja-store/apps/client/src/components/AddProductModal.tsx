import React, { useState } from 'react';
import { X } from 'lucide-react';
import { type Product } from '../types';

interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (product: Partial<Product>) => Promise<boolean>;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        description: '',
        price: '',
        image: ''
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const success = await onAdd({
                ...formData,
                price: parseFloat(formData.price)
            });

            if (success) {
                onClose();
                setFormData({ name: '', category: '', description: '', price: '', image: '' });
            } else {
                alert('Failed to add product');
            }
        } catch (err) {
            alert('Error adding product');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="cart-overlay" style={{ zIndex: 3000 }}>
            <div className="modal-box">
                <div className="cart-header">
                    <h2>Add New Product</h2>
                    <button className="cart-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.25rem' }}>Name</label>
                        <input name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '4px' }} />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.25rem' }}>Category</label>
                        <input name="category" value={formData.category} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '4px' }} />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.25rem' }}>Price (₹)</label>
                        <input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '4px' }} />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.25rem' }}>Image URL</label>
                        <input name="image" value={formData.image} onChange={handleChange} placeholder="https://..." required style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '4px' }} />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.25rem' }}>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '4px', minHeight: '80px' }} />
                    </div>
                    <button type="submit" className="checkout-btn">Add Product</button>
                </form>
            </div>
        </div>
    );
};
