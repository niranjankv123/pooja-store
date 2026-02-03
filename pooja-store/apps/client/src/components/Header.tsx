import React, { useState } from 'react';
import { ShoppingCart, ShoppingBag, User, Plus } from 'lucide-react';
import { type CartItem } from '../types';

interface HeaderProps {
    cart: CartItem[];
    setIsCartOpen: (isOpen: boolean) => void;
    isAdminLoggedIn: boolean;
    onLoginClick: () => void;
    onLogoutClick: () => void;
    onAddProductClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
    cart,
    setIsCartOpen,
    isAdminLoggedIn,
    onLoginClick,
    onLogoutClick,
    onAddProductClick
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header>
            <div className="container nav-content">
                <div className="logo">
                    <ShoppingBag size={28} />
                    <span>Divine Pooja Store</span>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {isAdminLoggedIn && (
                        <button className="cart-btn" onClick={onAddProductClick} title="Add Product">
                            <Plus size={24} />
                        </button>
                    )}

                    <div style={{ position: 'relative' }}>
                        <button className="cart-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <User size={24} />
                        </button>
                        {isMenuOpen && (
                            <div className="user-menu">
                                {isAdminLoggedIn ? (
                                    <button
                                        className="user-menu-btn"
                                        onClick={() => { onLogoutClick(); setIsMenuOpen(false); }}
                                        style={{ color: '#e74c3c' }}
                                    >
                                        Logout
                                    </button>
                                ) : (
                                    <button
                                        className="user-menu-btn"
                                        onClick={() => { onLoginClick(); setIsMenuOpen(false); }}
                                    >
                                        Admin Login
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
                        <ShoppingCart size={24} />
                        {cart.length > 0 && <span className="cart-count">{cart.reduce((s, i) => s + i.quantity, 0)}</span>}
                    </button>
                </div>
            </div>
        </header>
    );
};
