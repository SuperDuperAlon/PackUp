// TODO: logout button

'use client';

import React, { useEffect } from 'react';
import { adminService } from '@/services/admin.service';

const Logout = () => {
    useEffect(() => {
        async function logout() {
            await adminService.logout();
            window.location.href = '/';
        }
        logout();
    }, []);

    return <div>You have been logged out.</div>;
};

export default Logout;