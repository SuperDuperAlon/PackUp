'use client'

import React, { createContext, useContext, useState } from 'react';

const LoaderContext = createContext();

export function LoaderProvider({ children }) {
    const [loading, setLoading] = useState(false);

    return (
        <LoaderContext.Provider value={{ loading, setLoading }}>
            {loading &&
                <>
                    <div className="loader">
                        <div className="loader-spinner"></div>
                    </div>
                </>
            }
            {children}
        </LoaderContext.Provider>
    );
}
export const useLoader = () => useContext(LoaderContext);