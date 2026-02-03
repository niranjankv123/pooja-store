import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { type Product } from '../types';

interface ProductCardProps {
    product: Product;
    addToCart: (product: Product) => void;
    isAdmin?: boolean;
    onEdit?: (product: Product) => void;
    onDelete?: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    product,
    addToCart,
    isAdmin,
    onEdit,
    onDelete
}) => {
    return (
        <div className="product-card">
            <div style={{ position: 'relative' }}>
                <img src={product.image} alt={product.name} className="product-image" />
                {isAdmin && (
                    <div className="admin-actions">
                        <button
                            className="action-btn"
                            onClick={() => onEdit?.(product)}
                            title="Edit Product"
                        >
                            <Pencil size={16} color="var(--primary)" />
                        </button>
                        <button
                            className="action-btn"
                            onClick={() => onDelete?.(product.id)}
                            title="Delete Product"
                        >
                            <Trash2 size={16} color="#e74c3c" />
                        </button>
                    </div>
                )}
            </div>
            <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>{product.description}</p>
                <div className="card-footer">
                    <span className="product-price">₹{product.price.toFixed(2)}</span>
                    <button className="add-to-cart" onClick={() => addToCart(product)}>
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};
