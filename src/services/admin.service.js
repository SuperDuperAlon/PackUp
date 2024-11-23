import { storageService } from './storage.service'
import { utilService } from './util.service'

const STORAGE_KEY_LOGGEDIN_ADMIN = 'loggedInAdmin'
const STORAGE_KEY = 'admin_db'

export const adminService = {
    // saveLocalAdmin,
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