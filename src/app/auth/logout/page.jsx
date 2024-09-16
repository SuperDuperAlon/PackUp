'use client';

import React, { useEffect } from 'react';
import { userService } from '@/services/user.service';

const Logout = () => {
    useEffect(() => {
        async function logout() {
            await userService.logout();
        }
        logout();
    }, []);

    return <div>You have been logged out.</div>;
};

export default Logout;