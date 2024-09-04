export const utilService = {
    parseDate,
    generateId,
    getFullPackageDescription
}

function generateId() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}

function getFullPackageDescription(amount,
    type,
    color,
    size) {
    return `${amount} - ${type} בגודל ${size} בצבע ${color}`;
}

function parseDate(time) {
    const currentDateTime = new Date(time);
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    return currentDateTime.toLocaleString('en-UK', options);
}