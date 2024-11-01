'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminService } from '@/services/admin.service';
import { showToast } from '@/lib/reactToastify';
import FormValidation from '@/cmps/general/FormValidation/FormValidation';

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await adminService.signup({ username, email, password })
            await showToast('success', 'פעולה בוצעה בהצלחה')
            router.push('/packages')
        } catch (err) {
            console.error(err);
            await showToast('error', 'פעולה נכשלה')

        }
    };


    // TODO: form css
    return (
        <>
            <div className='edit_class__section'>
                <form onSubmit={handleSubmit} className='edit_class__form'>
                    <div className='header__logo'>towerOne</div>
                    <div className='edit_class__form_container'>
                        <label htmlFor="username">שם משתמש</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            pattern="\w{2,10}" required
                        />
                        <FormValidation
                            input={username}
                            regex="^[A-Za-z]{2,}[A-Za-z ]*$"
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
                            minlength="4" required
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
                        <button type="submit"  > הרשם </button>
                        <button onClick={() => router.push('/auth/login')}>חשבון קיים?</button>
                    </div>
                </form>
            </div>
        </>

    );
};


export default SignupForm;