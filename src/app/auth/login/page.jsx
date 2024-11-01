'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminService } from '@/services/admin.service';
import { useAuth } from '@/context/AuthContext';
import { showToast } from '@/lib/reactToastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()
    const { setAdmin } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await adminService.login({ email, password })
            if (user) {
                setAdmin(await adminService.getCurrentAdmin())
                await showToast('success', 'פעולה בוצעה בהצלחה')
                router.push('/packages')
            } else {
                router.push('/users/signup')
            }
        } catch (err) {
            console.error(err);
            await showToast('error', 'פעולה נכשלה')
        }
    };

    return (
        <div className='edit_class__section'>
            <form onSubmit={handleSubmit} className='edit_class__form'>
            <div className='header__logo'>towerOne</div>
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
                    <button onClick={() => router.push('/auth/signup')}>הרשם  </button>
                </div>
            </form>
        </div>
    );
};

export default Login;