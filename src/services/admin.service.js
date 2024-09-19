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
        const admins = await storageService.query(STORAGE_KEY)
        const admin = admins.find(admin => admin.admin_name === adminCred.admin_name && admin.password === adminCred.password)
        if (admin) {
            return saveLocalAdmin(admin)
        }
    } catch (err) {
        console.log(err)
    }
}

async function signup(adminCred) {
    const admin = await storageService.post(STORAGE_KEY, adminCred)
    return saveLocalAdmin(admin)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_ADMIN)
}

function saveLocalAdmin(admin) {
    admin = { id: admin.id, admin_name: admin.admin_name }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_ADMIN, JSON.stringify(admin))
    return admin
}

function getloggedInAdmin() {
    if (typeof sessionStorage !== 'undefined') {

        return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_ADMIN))
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

    for (let i = 1; i <= 3; i++) {
        const firstName = getRandomItem(firstNames);
        const lastName = getRandomItem(lastNames);
        const email = generateRandomEmail(firstName, lastName);
        const password = `password${getRandomInt(100, 999)}`;
        const phone = '05'+ getRandomInt(10000000, 99999999);

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