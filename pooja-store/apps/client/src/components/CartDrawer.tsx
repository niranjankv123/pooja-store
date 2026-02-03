import React from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { type CartItem } from '../types';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    cart: CartItem[];
    updateQuantity: (id: string, delta: number) => void;
    removeFromCart: (id: string) => void;
    onCheckout: () => void;
    total: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
    isOpen,
    onClose,
    cart,
    updateQuantity,
    removeFromCart,
    onCheckout,
    total,
}) => {
    if (!isOpen) return null;

    return (
        <div className="cart-overlay" onClick={onClose}>
            <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
                <div className="cart-header">
                    <h2>Your Cart</h2>
                    <button className="cart-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>
                <div className="cart-items">
                    {cart.length === 0 ? (
                        <p style={{ textAlign: 'center', marginTop: '2rem' }}>Your cart is empty.</p>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-img" />
                                <div className="cart-item-info">
                                    <h4 className="product-name" style={{ fontSize: '1rem' }}>
                                        {item.name}
                                    </h4>
                                    <p className="product-price" style={{ fontSize: '1rem' }}>
                                        ₹{item.price.toFixed(2)}
                                    </p>
                                    <div className="qty-controls">
                                        <button
                                            className="qty-btn"
                                            onClick={() => updateQuantity(item.id, -1)}
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            className="qty-btn"
                                            onClick={() => updateQuantity(item.id, 1)}
                                        >
                                            <Plus size={16} />
                                        </button>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            style={{ marginLeft: 'auto', color: 'var(--secondary)', background: 'none', border: 'none', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {cart.length > 0 && (
                    <div className="cart-footer">
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '1rem',
                                fontSize: '1.25rem',
                                fontWeight: 'bold',
                            }}
                        >
                            <span>Total</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                        <button className="checkout-btn" onClick={onCheckout}>
                            Checkout Now
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
