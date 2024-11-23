'use client'

import { authService } from '@/services/auth.service';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    // const token = req.cookies.get('token')?.value;



    useEffect(() => {
        const fetchAdmin = async () => {
            // TODO: replace with actual API call
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
