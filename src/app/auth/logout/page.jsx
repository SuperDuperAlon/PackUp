'use client';

import React, { useEffect } from 'react';
import { userService } from '@/services/user.service';
import { adminService } from '@/services/admin.service';

const Logout = () => {
    useEffect(() => {
        async function logout() {
            await adminService.logout();
        }
        logout();
    }, []);

    return <div>You have been logged out.</div>;
};

export default Logout;