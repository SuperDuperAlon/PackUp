import { storageService } from './storage.service'
import { utilService } from './util.service'

const STORAGE_KEY_LOGGEDIN_ADMIN = 'loggedInAdmin'
const STORAGE_KEY = 'admin_db'

export const adminService = {
    login,
    logout,
    signup,
    getloggedInAdmin,
    saveLocalAdmin,
    getAdmins,
    getById
}

function getAdmins() {
    return storageService.query(STORAGE_KEY)
}

async function getById(adminId) {
    const admin = await storageService.get('admin', adminId)
    return admin
}

async function login(adminCred) {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(adminCred),
        });

        if (!response.ok) {
            throw new Error(`Error during login: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.token;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
}

async function signup(adminCred) {
    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(adminCred),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Something went wrong');
        }

        return data.token;
    } catch (error) {
        console.error('Error during sign-up:', error);
        throw error;
    }
}

async function logout() {
    try {
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
        })
        if (!response.ok) {
            throw new Error('Failed to logout')
        }
    } catch (error) {
        console.error('Error during logout:', error)
    }
}

// function saveLocalAdmin(admin) {
//     admin = { id: admin.id, admin_name: admin.admin_name }
//     sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_ADMIN, JSON.stringify(admin))
//     return admin
// }

// TODO: add to middleware
function getloggedInAdmin() {
    if (typeof sessionStorage !== 'undefined') {
        return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_ADMIN))
    } else {
        return null;
    }
}

// TODO: add to ustil file
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

    for (let i = 1; i <= 3; i++) {
        const firstName = getRandomItem(firstNames);
        const lastName = getRandomItem(lastNames);
        const email = generateRandomEmail(firstName, lastName);
        const password = `password${getRandomInt(100, 999)}`;
        const phone = '05' + getRandomInt(10000000, 99999999);

        tenants.push({
            id: i,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            password: password,
            isAdmin: true
        });
    }
    return tenants;
}

const tenants = generateRandomTenants();
// console.log(tenants)
const jsonTenants = JSON.stringify(tenants);
// console.log(jsonTenants)

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