import { storageService } from './storage.service'
import { userService } from './user.service'
import { utilService } from './util.service'


const STORAGE_KEY = 'user_db'

export const userServiceLocal = {
    // saveLocalUser,
    getUsers,
    getUserById,
    removeUser,
    getUserById,
    save,
    getEmptyUser,
    getDefaultFilter,
    generateTenants
}

async function getUsers(filterBy) {
    const users = await storageService.query(STORAGE_KEY)
    if (filterBy.text) {
        const regex = new RegExp(filterBy.text, 'i')
        return users.filter(user =>
            regex.test(user.firstName)
            || regex.test(user.lastName)
            || regex.test(user.apartmentNumber)
            || regex.test(user.fullUserDescription)
        )
    } else {
        return users
    }
}

async function removeUser(userId) {
    return storageService.remove(STORAGE_KEY, userId)
}

async function getUserById(userId) {
    const user = await storageService.get(STORAGE_KEY, userId)
    return user
}

async function save(userToSave) {
    if (userToSave.id) {
        const user = await storageService.put(STORAGE_KEY, userToSave)
        return user
    } else {
        const user = await storageService.post(STORAGE_KEY, {
            ...userToSave, id: utilService.generateId()
        })
        return user
    }
}

function getEmptyUser() {
    return {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        apartmentNumber: '',
        password: '',
        isActive: false,
        fullUserDescription: '',
        dateOfBirth: '',
        packages: []
    }
}

function getDefaultFilter() {
    return {
        text: '',
        date: {
            startDate: '',
            endDate: ''
        }
    }
}

generateTenants()

function generateTenants() {
    if (typeof window !== 'undefined') {
        let tenants = storageService.loadFromStorage(STORAGE_KEY);
        if (!tenants || !tenants.length) {
            tenants = utilService.generateRandomTenants()
        }
        // tenants.forEach(tenant => userService.save(tenant))
        // storageService.saveToStorage(STORAGE_KEY, tenants);
    }
}

// const usersData = [
//     { id: utilService.generateId(), username: 'alef', password: 'user', isManager: true, dateCreated: Date.now() },
//     { id: utilService.generateId(), username: 'bet', password: 'user', isManager: false, dateCreated: Date.now() },
//     { id: utilService.generateId(), username: 'gimel', password: 'user', isManager: true, dateCreated: Date.now() }
// ]

// _createUsers()

// function _createUsers() {
//     if (typeof window !== 'undefined') {
//         let users = storageService.loadFromStorage(STORAGE_KEY);
//         if (!users || !users.length) {
//             users = usersDemoData
//         }
//         storageService.saveToStorage(STORAGE_KEY, users);
//     }
// }