import { storageService } from './storage.service'
import { utilService } from './util.service'

const STORAGE_KEY_LOGGEDIN_ADMIN = 'loggedInAdmin'
const STORAGE_KEY = 'admin_db'

export const adminService = {
    // saveLocalAdmin,
    getAdmins,
    removeAdmin,
    getById,
    save
}

async function getAdmins() {
    return storageService.query(STORAGE_KEY)
}

async function removeAdmin(adminId) {
    return storageService.remove(STORAGE_KEY, adminId)
}

async function getById(adminId) {
    const admin = await storageService.get('admin', adminId)
    return admin
}

async function save(adminId) {
    if (adminId) {
        const admin = await storageService.get(STORAGE_KEY, adminId)
        return admin
    } else {
        const admin = await storageService.post(STORAGE_KEY, {
            id: utilService.generateId(),
            username: 'admin' + utilService.getRandomInt(2, 80),
            password: 'admin'
        })
    }
}

function getEmptyAdmin() {
    return {
        username: '',
        password: ''
    }
}

const adminsData = [
    { id: 'admin1', username: 'admin', password: 'admin' },
    { id: 'admin2', username: 'admin2', password: 'admin2' },
    { id: 'admin3', username: 'admin3', password: 'admin3' },
]

_createAdmins()

function _createAdmins() {
    if (typeof window !== 'undefined') {
        let admins = storageService.loadFromStorage(STORAGE_KEY);
        if (!admins || !admins.length) {
            admins = adminsData
        }
        storageService.saveToStorage(STORAGE_KEY, admins);
    }
}