'use client'
import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext';

const Header = () => {
    const { admin } = useAuth();
    const pathname = usePathname()
    const router = useRouter()

    if (pathname === '/' || pathname.includes('/auth')) {
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
                            <button type='button' onClick={() => router.push('/auth/logout')}>התנתק</button>
                        </>
                        :
                        <button type='button' onClick={() => router.push('/auth/login')}>התחבר</button>
                    }
                </div>
                <div className='header__left'>
                    <div className='header__logo' onClick={() => router.push('/')}>towerOne</div>
                </div>
            </section>
        </header>
    )
}

export default Header