'use client'

import React, { useState } from 'react';
import { userService } from '@/services/user.service'
import { useRouter } from 'next/navigation';
import { adminService } from '@/services/admin.service';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await adminService.login({ email, password })
            if (user) {
                router.push('/packages')
            } else {
                router.push('/users/signup')
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='edit_class__section'>
            <form onSubmit={handleSubmit} className='edit_class__form'>
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

                <button type="submit">התחבר</button>
            </form>
        </div>
    );
};

export default Login;