'use client'

import React, { useState } from 'react';
import { userService } from '@/services/user.service'
import { useRouter } from 'next/navigation';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await userService.login({ username, password })
            if (user) {
                router.push('/')
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
                        שם משתמש
                    </label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className='edit_class__form_container'>
                    <label>
                        סיסמא
                    </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;