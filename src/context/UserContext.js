'use client'

import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Initial user state is null

    useEffect(() => {
        // Fetch user data from an API or get it from a cookie
        const fetchUser = async () => {
            const res = await fetch('/api/auth/getcurrentuser'); // Adjust the endpoint as needed
            if (res.ok) {
                const data = await res.json();
                console.log(data);

                setUser(data.user); // Assuming the response contains user data
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
