'use client'

import React, { useState } from 'react';
import { userService } from '@/services/user.service';
import { useRouter } from 'next/navigation';

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Add your signup logic here
        userService.signup({ username, email, password })
        router.push('/')
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">שם משתמש: </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /><br /><br />

                <label htmlFor="email">כתובת מייל: </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /><br /><br />

                <label htmlFor="password">סיסמא: </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br /><br />

                <input type="submit" value="Sign Up" />

            </form>
            <div>
                <button onClick={() => router.push('/users/login')}>חשבון קיים?</button>
            </div>
        </>

    );
};

export default SignupForm;