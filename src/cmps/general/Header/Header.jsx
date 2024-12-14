'use client'
import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/auth.service';
import RouteButton from '@/cmps/general/Buttons/RouteButton/RouteButton';

const Header = () => {
    const { admin } = useAuth();
    const pathname = usePathname()
    const router = useRouter()

    if (pathname === '/' || pathname.includes('/auth') || pathname.includes('/tenant')) {
        return null
    }
    console.log(admin);

    async function onLogout() {
        await authService.logout();
        router.push('/auth/login');
    }

    if (!admin) {
        return null
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
                    {admin.isAdmin &&
                        <>
                            <RouteButton content={'ניהול משתמשים'} linkedRoute={'users'} />
                            <RouteButton content={'ניהול מנהלים'} linkedRoute={'admin'} />
                        </>
                    }
                    <div className='header__logo' onClick={() => router.push('/')}>PackUp</div>

                </div>
            </section>
        </header>
    )
}

export default Header