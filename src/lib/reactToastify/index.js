import { toast } from 'react-toastify';

export const showToast = (type, message, options = {}) => {
    return new Promise((resolve, reject) => {
        const defaultOptions = { position: "bottom-right", autoClose: 2000, rtl: true, ...options };

        // Display the toast based on type
        switch (type) {
            case 'success':
                toast.success(message, defaultOptions);
                resolve("Success toast shown");
                break;
            case 'error':
                toast.error(message, defaultOptions);
                reject("Error toast shown");
                break;
            case 'info':
                toast.info(message, defaultOptions);
                resolve("Info toast shown");
                break;
            case 'warn':
                toast.warn(message, defaultOptions);
                resolve("Warning toast shown");
                break;
            default:
                toast(message, defaultOptions);
                resolve("Default toast shown");
        }
    });
};