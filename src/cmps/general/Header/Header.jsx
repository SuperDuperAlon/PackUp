'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/UserContext';

const Header = () => {
    const { user } = useUser();
    const router = useRouter()
    if (!user) return null
    else return (
        <header className='index-layout full'>
            <section className='header'>
                <div className='header__right'>
                    {user ? <h1>שלום, {user.username}</h1> : <p>התחבר</p>}
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