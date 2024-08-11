'use client'
import React from 'react'
import styles from './Header.module.css'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Header = () => {

    const router = useRouter()
    return (
        <header className={styles.header}>
            <div className={styles.header__right}>
                <div>שלום, אורח</div>
                {/* <button type='button' onClick={() => router.push('/users/login')}>Login</button> */}
            </div>
            <div className={styles.header__left}>
                <h1><Link href={'/'}>myTlv</Link></h1>
                {/* <button type='button' onClick={() => router.push('/')}>Logo</button> */}
            </div>
        </header>
    )
}

export default Header