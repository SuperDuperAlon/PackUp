'use client'
import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext';
import { adminService } from '@/services/admin.service';

const Header = () => {
    const { admin } = useAuth();
    const pathname = usePathname()
    const router = useRouter()

    if (pathname === '/' || pathname.includes('/auth')) {
        return null
    }

    async function onLogout() {
        await adminService.logout();
        router.push('/auth/signup');
    }

    return (
        <header className='index-layout full'>
            <section className='header'>
                <div className='header__right'>
                    {admin ?
                        <>
                            { /* TODO: put them in one line */}
                            <p className='capitalize'>שלום, {admin.username}</p>
                            <button type='button' onClick={() => onLogout()}>התנתק</button>
                        </>
                        :
                        <p>אנא המתן</p>
                    }
                </div>
                <div className='header__left'>
                    <div className='header__logo' onClick={() => router.push('/')}>PackUp</div>
                </div>
            </section>
        </header>
    )
}

export default Header