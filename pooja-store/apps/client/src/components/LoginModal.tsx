import React, { useState } from 'react';
import { X } from 'lucide-react';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: (username: string, password: string) => Promise<boolean>;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const success = await onLogin(username, password);
            if (success) {
                onClose();
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError('Login failed');
        }
    };

    return (
        <div className="cart-overlay" style={{ zIndex: 3000 }}>
            <div className="modal-box">
                <div className="cart-header">
                    <h2>Admin Login</h2>
                    <button className="cart-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="admin"
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password123"
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                        />
                    </div>
                    <button type="submit" className="checkout-btn">Login</button>
                </form>
            </div>
        </div>
    );
};
