import { storageService } from './storage.service'
import { utilService } from './util.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY = 'user_db'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById
}

function getUsers() {
    return storageService.query(STORAGE_KEY)
}

async function getById(userId) {
    const user = await storageService.get('user', userId)
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
    const user = await storageService.post(STORAGE_KEY, userCred)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function saveLocalUser(user) {
    user = { id: user.id, username: user.username }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

// function _createUsers() {
//     let users = utilService.loadFromStorage(STORAGE_KEY)
//     if (!users || !users.length) {
//         users = userData.getUserData()
//         utilService.saveToStorage(STORAGE_KEY, users)
//     }
// }
// (async () => {
//     await userService.signup({ fullname: 'Puki Norma', username: 'puki', password: '123', score: 10000, isAdmin: false })
//     await userService.signup({ fullname: 'Master Adminov', username: 'admin', password: '123', score: 10000, isAdmin: true })
//     await userService.signup({ fullname: 'Muki G', username: 'muki', password: '123', score: 10000 })
// })()