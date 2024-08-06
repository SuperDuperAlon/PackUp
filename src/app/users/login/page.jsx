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
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;