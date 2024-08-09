import React from 'react';

const EmailReminder = () => {
    const handleClick = () => {
        console.log('test');
        const subject = 'Hello';
        const body = 'This is the email body';
        const recipient = 'adsforalon@gmail.com';

        const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    };

    return (
        <>
            <button onClick={handleClick}>תזכורת</button>
        </>
    );
};

export default EmailReminder;