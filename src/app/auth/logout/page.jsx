// TODO: logout button

'use client';

import React, { useEffect } from 'react'
import { adminService } from '@/services/admin.service';
import { useRouter } from 'next/navigation';
import { showToast } from '@/lib/reactToastify';

const Logout = () => {
    const router = useRouter();
    useEffect(() => {
        async function logout() {
            await adminService.logout();
            await showToast('success', 'פעולה בוצעה בהצלחה')
            router.push('/');
        }
        logout();
    }, []);

    return <div>You have been logged out.</div>;
};

export default Logout;