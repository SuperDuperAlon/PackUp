'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { useAuth } from '@/context/AuthContext';
import { useLoader } from '@/context/LoaderContext'
import { showToast } from '@/lib/reactToastify';
import Link from 'next/link';

const Login = () => {
    const [email, setEmail] = useState('guest@pack.up');
    const [password, setPassword] = useState('guest');
    const router = useRouter()
    const { setAdmin } = useAuth()
    const { setLoading } = useLoader()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const user = await authService.login({ email, password })
            if (user) {
                setAdmin(await authService.getCurrentAdmin())
                await showToast('success', 'פעולה בוצעה בהצלחה')
                router.push('/packages')
            } else {
                router.push('/users/signup')
            }
            setLoading(false)
        } catch (err) {
            console.error(err);
            setLoading(false)
            await showToast('error', 'פעולה נכשלה')
        }
    };

    return (
        <div className='edit_class__section'>
            <form onSubmit={handleSubmit} className='edit_class__form'>
                <div className='header__logo'>PackUp</div>
                <div className='edit_class__form_container'>
                    <label>
                        כתובת מייל
                    </label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='edit_class__form_container'>
                    <label>
                        סיסמא
                    </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='edit_class__form_submit_row'>
                    <button type="submit">התחבר</button>
                    <Link href={'/auth/signup'}>הרשם</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;