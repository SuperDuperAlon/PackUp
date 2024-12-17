'use client'

import { authService } from '@/services/auth.service';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const fetchAdmin = async () => {
            const currAdmin = await authService.getCurrentAdmin();
            setAdmin(currAdmin);
        };
        fetchAdmin();
    }, []);

    return (
        <AuthContext.Provider value={{ admin, setAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
