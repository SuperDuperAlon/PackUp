'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminService } from '@/services/admin.service';

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await adminService.signup({ username, email, password })
            router.push('/packages')
        } catch (err) {
            console.error(err);
        }
    };


    // TODO: form css
    return (
        <>
            <div className='edit_class__section'>
                <form onSubmit={handleSubmit} className='edit_class__form'>
                    <div className='edit_class__form_container'>
                        <label htmlFor="username">שם משתמש</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className='edit_class__form_container'>
                        <label htmlFor="email">כתובת מייל</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='edit_class__form_container'>
                        <label htmlFor="password">סיסמא
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='edit_class__form_submit_row'>
                        <input type="submit" value="Sign Up" />
                        <button onClick={() => router.push('/auth/login')}>חשבון קיים?</button>
                    </div>
                </form>

            </div>
        </>

    );
};

export default SignupForm;