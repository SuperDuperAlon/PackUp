import React from 'react';
import { CiMail } from "react-icons/ci";
import { showToast } from '@/lib/reactToastify';

const EmailReminder = () => {
    const handleClick = () => {
        console.log('Email sent');
        // const subject = 'Hello';
        // const body = 'This is the email body';
        // const recipient = 'adsforalon@gmail.com';
        // const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        // window.location.href = mailtoLink;
        showToast('success', 'פעולה בוצעה בהצלחה')
    };

    return (
        <>
            <button onClick={handleClick} className='round-btn reminder-btn'><CiMail /></button>
        </>
    );
};

export default EmailReminder;