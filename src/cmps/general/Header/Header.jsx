'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext';

const Header = () => {
    const { admin } = useAuth();
    const router = useRouter()

    // console.log(user);
    

    return (
        <header className='index-layout full'>
            <section className='header'>
                <div className='header__right'>
                    {admin ? <h1>שלום, {admin.username}</h1> : <p>התחבר</p>}
                    <button type='button' onClick={() => router.push('/auth/login')}>התנתק</button>
                </div>
                <div className='header__left'>
                    <div className='header__logo' onClick={() => router.push('/')}>towerOne</div>
                </div>
            </section>
        </header>
    )
}

export default Header