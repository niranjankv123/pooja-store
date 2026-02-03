import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (name: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const [name, setName] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onConfirm(name);
        }
    };

    return (
        <div className="cart-overlay" style={{ zIndex: 2000 }}>
            <div className="modal-box">
                <div className="cart-header">
                    <h2>Checkout Details</h2>
                    <button className="cart-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Your Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '1rem' }}
                        />
                    </div>
                    <button type="submit" className="checkout-btn">
                        Proceed to WhatsApp
                    </button>
                </form>
            </div>
        </div>
    );
};
