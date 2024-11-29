import { storageService } from './storage.service'
import { utilService } from './util.service'

const STORAGE_KEY_LOGGEDIN_ADMIN = 'loggedInAdmin'
const STORAGE_KEY = 'admin_db'

export const adminService = {
    // saveLocalAdmin,
    getAdmins,
    getAdminById,
    removeAdmin,
    getAdminById,
    save,
    getEmptyAdmin,
    getDefaultFilter
}

async function getAdmins(filterBy) {
    const admins = await storageService.query(STORAGE_KEY)
    console.log(admins);
    
    if (filterBy.username) {
        const regex = new RegExp(filterBy.username, 'i')
        return admins.filter(admin => regex.test(admin.username))
    } else {
        return admins
    }
}

async function removeAdmin(adminId) {
    return storageService.remove(STORAGE_KEY, adminId)
}

async function getAdminById(adminId) {
    const admin = await storageService.get(STORAGE_KEY, adminId)
    return admin
}

async function save(adminToSave) {
    if (adminToSave.id) {
        const admin = await storageService.put(STORAGE_KEY, adminToSave)
        return admin
    } else {
        const admin = await storageService.post(STORAGE_KEY, {
            ...adminToSave, id: utilService.generateId()
        })
        return admin
    }
}

function getEmptyAdmin() {
    return {
        username: '',
        password: ''
    }
}

function getDefaultFilter() {
    return {
        username: '',
    }
}

const adminsData = [
    { id: utilService.generateId(), username: 'alef', password: 'admin', isManager: true, dateCreated: Date.now() },
    { id: utilService.generateId(), username: 'bet', password: 'admin', isManager: false, dateCreated: Date.now() },
    { id: utilService.generateId(), username: 'gimel', password: 'admin', isManager: true, dateCreated: Date.now() }
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