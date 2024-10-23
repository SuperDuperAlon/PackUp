'use client'

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const fetchAdmin = async () => {
            // TODO: replace with actual API call
            const res = await fetch('/api/auth/getcurrentadmin');

            if (res.ok) {
                const data = await res.json()
                setAdmin(data.admin);
            }
        };
        fetchAdmin();
    }, []);

    return (
        <AuthContext.Provider value={{ admin: admin, setAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
