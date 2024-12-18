'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { showToast } from '@/lib/reactToastify';
import FormValidation from '@/cmps/general/FormValidation/FormValidation';
import { useAuth } from '@/context/AuthContext';
import { useLoader } from '@/context/LoaderContext'
import Link from 'next/link';

// TODO: change form validation to zod

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setAdmin } = useAuth()
    const { setLoading } = useLoader()

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            await authService.signup({ username, email, password })
            const user = await authService.getCurrentAdmin()
            if (user) {
                setAdmin(user)
                router.push('/packages')
            }
            setLoading(false)
        } catch (err) {
            console.error(err);
            setLoading(false)
            await showToast('error', 'פעולה נכשלה')
        }
    };

    return (
        <>
            <div className='edit_class__section'>
                <form onSubmit={handleSubmit} className='edit_class__form'>
                    <div className='header__logo'>PackUp</div>
                    <div className='edit_class__form_container'>
                        <label htmlFor="username">שם משתמש</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            // pattern="^[A-Za-z\u0590-\u05FF ]{2,}$" 
                            required
                        />
                        <FormValidation
                            input={username}
                            regex="^[A-Za-z\u0590-\u05FF ]{2,}$"
                            successMessage="שם משתמש תקין"
                            errorMessage="הזן לפחות 2 אותיות"
                        />
                    </div>
                    <div className='edit_class__form_container'>
                        <label htmlFor="email">כתובת מייל</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            // pattern=".+@example\.com"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FormValidation
                            input={email}
                            regex="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
                            successMessage="כתובת המייל תקינה"
                            errorMessage="כתובת המייל אינה תקינה"
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
                            minLength="4" required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormValidation
                            input={password}
                            regex="^.{4,}$"
                            successMessage="אורך סיסמא תקין"
                            errorMessage="אורך הסיסמא 4 תווים או יותר"
                        />
                    </div>
                    <div className='edit_class__form_submit_row'>
                        <button type="submit"> הרשם </button>
                        <Link href={'/auth/login'}>חשבון קיים?</Link>
                    </div>
                </form>
            </div>
        </>

    );
};


export default SignupForm;