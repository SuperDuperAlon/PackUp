'use client';

import React, { useEffect } from 'react'
import { authService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { showToast } from '@/lib/reactToastify';
import { useLoader } from '@/context/LoaderContext';

const Logout = () => {
    const router = useRouter();
    const { setLoading } = useLoader()
    useEffect(() => {
        async function logout() {
            await authService.logout();
            setLoading(true)
            router.push('/auth/login');
            await showToast('success', 'פעולה בוצעה בהצלחה')
        }
        setLoading(false)
        logout();
    }, []);

    return <div>You have been logged out.</div>;
};

export default Logout;