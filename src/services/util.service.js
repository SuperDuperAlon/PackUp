export const utilService = {
    parseDate,
    generateId,
    getFullPackageDescription,
    getRandomTimestampFromLast3Days
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
    };
    return currentDateTime.toLocaleString('en-UK', options);
}

function getRandomTimestampFromLast3Days() {
    const now = Date.now();
    const threeDaysAgo = now - 3 * 24 * 60 * 60 * 1000;
    const randomTimestamp = Math.floor(Math.random() * (now - threeDaysAgo + 1)) + threeDaysAgo;
    return new Date(randomTimestamp);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItem(arr) {
    return arr[getRandomInt(0, arr.length - 1)];
}

function generateRandomEmail(firstName, lastName) {
    const domains = ["[example.com](http://example.com/)", "[mail.com](http://mail.com/)", "[email.com](http://email.com/)"];
    return `${firstName}.${lastName}@${getRandomItem(domains)}`;
}

function generateRandomTenants() {
    const firstNames = ["יוחנן", "שרה", "מרק", "איילת", "דוד", "רחל", "אורן", "נעמי", "מיכאל", "ליה"];
    const lastNames = ["כהן", "לוי", "אברהם", "בנימין", "שמעון", "יצחק", "עומר", "ניסים", "גרשון", "ברוך"];
    const tenants = [];

    for (let i = 1; i <= 20; i++) {
        const firstName = getRandomItem(firstNames);
        const lastName = getRandomItem(lastNames);
        const apartmentNumber = getRandomInt(1001, 1399);
        const email = generateRandomEmail(firstName, lastName);
        const password = `password${getRandomInt(100, 999)}`;


        tenants.push({
            id: i,
            firstName: firstName,
            lastName: lastName,
            apartmentNumber: apartmentNumber,
            email: email,
            password: password,
            isTenant: true
        });
    }
    return tenants;
}

const tenants = generateRandomTenants();