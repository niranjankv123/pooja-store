import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useAdmin = () => {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    useEffect(() => {
        const storedAdmin = localStorage.getItem('isAdminLoggedIn');
        if (storedAdmin === 'true') setIsAdminLoggedIn(true);
    }, []);

    const login = async (username: string, password: string) => {
        const success = await api.login(username, password);
        if (success) {
            setIsAdminLoggedIn(true);
            localStorage.setItem('isAdminLoggedIn', 'true');
            setIsLoginModalOpen(false);
        }
        return success;
    };

    const logout = () => {
        setIsAdminLoggedIn(false);
        localStorage.removeItem('isAdminLoggedIn');
    };

    const openLoginModal = () => setIsLoginModalOpen(true);
    const closeLoginModal = () => setIsLoginModalOpen(false);

    return {
        isAdminLoggedIn,
        isLoginModalOpen,
        login,
        logout,
        openLoginModal,
        closeLoginModal,
    };
};
