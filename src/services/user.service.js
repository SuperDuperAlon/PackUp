import { storageService } from './storage.service'
import { utilService } from './util.service'

const STORAGE_KEY = 'user_db'

export const userService = {
    // saveLocalUser,
    getUsers,
    getUserById,
    removeUser,
    getUserById,
    save,
    getEmptyUser,
    getDefaultFilter
}

async function getUsers() {
    const users = await storageService.query(STORAGE_KEY)    
    // if (filterBy.username) {
    //     const regex = new RegExp(filterBy.username, 'i')
    //     return users.filter(user => regex.test(user.username))
    // } else {
        console.log(users);
        return users
    // }
    
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
        username: '',
        password: ''
    }
}

function getDefaultFilter() {
    return {
        username: '',
    }
}

const usersData = [
    { id: utilService.generateId(), username: 'alef', password: 'user', isManager: true, dateCreated: Date.now() },
    { id: utilService.generateId(), username: 'bet', password: 'user', isManager: false, dateCreated: Date.now() },
    { id: utilService.generateId(), username: 'gimel', password: 'user', isManager: true, dateCreated: Date.now() }
]

_createUsers()

function _createUsers() {
    if (typeof window !== 'undefined') {
        let users = storageService.loadFromStorage(STORAGE_KEY);
        if (!users || !users.length) {
            users = usersData
        }
        storageService.saveToStorage(STORAGE_KEY, users);
    }
}