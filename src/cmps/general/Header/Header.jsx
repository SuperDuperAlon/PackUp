'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Header = () => {
    const router = useRouter()
    return (
        <header className='index-layout full'>
            <section className='header'>
                <div className='header__right'>
                    <div>שלום, אורח</div>
                    {/* <button type='button' onClick={() => router.push('/users/login')}>Login</button> */}
                </div>
                <div className='header__left'>
                    <div className='header__logo' onClick={() => router.push('/')}>towerOne</div>
                    {/* <button type='button' onClick={() => router.push('/')}>Logo</button> */}
                </div>
            </section>
        </header>
    )
}

export default Header