import { storageService } from './storage.service'
import { utilService } from './util.service'
import users from '@/users.json'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser'
const STORAGE_KEY = 'user_db'

export const userService = {
    login,
    logout,
    signup,
    getloggedInUser,
    saveLocalUser,
    getUsers,
    getById
}

function getUsers() {
    return storageService.query(STORAGE_KEY)
}

async function getById(userId) {
    const user = await storageService.get(STORAGE_KEY, userId)
    return user
}


async function login(userCred) {
    try {
        const users = await storageService.query(STORAGE_KEY)
        const user = users.find(user => user.username === userCred.username && user.password === userCred.password)
        if (user) {
            return saveLocalUser(user)
        }
    } catch (err) {
        console.log(err)
    }
}

async function signup(userCred) {
    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userCred),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Something went wrong');
        }

        // Return the token or other success response
        return data.token;
    } catch (error) {
        console.error('Error during sign-up:', error);
        throw error;
    }
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function saveLocalUser(user) {
    user = { id: user.id, username: user.username }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getloggedInUser() {
    if (typeof sessionStorage !== 'undefined') {

        return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
    } else {
        return null;
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItem(arr) {
    return arr[getRandomInt(0, arr.length - 1)];
}

function generateRandomEmail(firstName, lastName) {
    const domains = ["example.com", "mail.com", "email.com"];
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
    tenants.push({
        id: 21,
        firstNameEN: "alon",
        lastNameEN: "mlievski",
        firstName: "אלון",
        lastName: "מליאבסקי",
        apartmentNumber: 9999,
        email: "alon.mlievski@example.com",
        password: "password905",
        isTenant: true,
        profileImage: "image.png"
    })
    return tenants;
}

const tenants = generateRandomTenants();
const jsonTenants = JSON.stringify(tenants);

_createPackages()

function _createPackages() {
    if (typeof window !== 'undefined') {
        let packages = storageService.loadFromStorage(STORAGE_KEY);
        if (!packages || !packages.length) {
            packages = tenants
        }
        storageService.saveToStorage(STORAGE_KEY, packages);
    }
}