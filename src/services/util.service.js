import { z } from 'zod';

export const utilService = {
    parseDate,
    generateId,
    getFullPackageDescription,
    getRandomTimestampFromLast3Days,
    getRandomInt,
    validateForm,
    generateRandomTenants
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

function parseDate(timestamp) {
    const date = new Date(timestamp);

    // Extract day name, time, and date separately
    const dayName = new Intl.DateTimeFormat('he-IL', { weekday: 'long' }).format(date);
    const time = new Intl.DateTimeFormat('he-IL', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(date);
    const fullDate = new Intl.DateTimeFormat('he-IL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(date);

    // Combine into desired format
    return (
        <>
            <div style={{ fontWeight: '500' }}>
                {dayName}, {time}
            </div>
            <div style={{ fontStyle: 'italic', fontSize: '12px' }}>{fullDate}</div>
        </>
    );
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
    const domains = ["example.com", "mail.com", "email.com)"];
    return `${firstName}.${lastName}@${getRandomItem(domains)}`;
}

function generateRandomTenants() {
    const firstNames = ["יוחנן", "שרה", "מרק", "איילת", "דוד", "רחל", "אורן", "נעמי", "מיכאל", "ליה"];
    const lastNames = ["כהן", "לוי", "אברהם", "בנימין", "שמעון", "יצחק", "עומר", "ניסים", "גרשון", "ברוך"];
    const tenants = [];

    for (let i = 1; i <= 4; i++) {
        const firstName = getRandomItem(firstNames);
        const lastName = getRandomItem(lastNames);
        const apartmentNumber = getRandomInt(1001, 1050).toString();
        // const email = generateRandomEmail(firstName, lastName);
        const password = `password${getRandomInt(100, 999)}`;
        // const dateOfBirth = getRandomDOB();


        tenants.push({
            // id: i,
            firstName: firstName,
            lastName: lastName,
            apartmentNumber: apartmentNumber,
            fullUserDescription: `${apartmentNumber} - ${firstName} ${lastName}`,
            dateCreated: Date.now(),
            // email: email,
            password: password,
            isTenant: true,
            // dateOfBirth: dateOfBirth
        });
    }
    return tenants;
}

const tenants = generateRandomTenants();


function validateForm(schema, formData) {
    try {
        schema.parse(formData);
        return true;
    } catch (error) {
        if (error instanceof z.ZodError) {
            // console.error('Validation Errors:', error.errors);
            console.log('Validation Errors:', error.errors);
            return error.errors;
        } else {
            console.error('Unexpected Error:', error);
        }
        return;
    }
};

function getRandomDOB() {
    const currentYear = new Date().getFullYear();
  
    // Calculate the range of birth years
    const maxYear = currentYear - 21; // Youngest age
    const minYear = currentYear - 67; // Oldest age
  
    // Generate a random year within the range
    const year = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
  
    // Generate a random month (0-11, where 0 is January and 11 is December)
    const month = Math.floor(Math.random() * 12);
  
    // Generate a random day (1-31, adjusted for the month and leap years)
    const day = Math.floor(
      Math.random() * new Date(year, month + 1, 0).getDate()
    ) + 1;
  
    // Return the DOB as a formatted date
    return new Date(year, month, day);
  }
  
  // Example usage
  console.log(getRandomDOB());