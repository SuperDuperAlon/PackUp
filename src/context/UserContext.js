'use client'

import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            // TODO: replace with actual API call
            const res = await fetch('/api/auth/getcurrentuser'); 
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            }
        };

        fetchUser();
    }, []);

    console.log('user', user);

    if (!user) console.log('no user');
    else return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
