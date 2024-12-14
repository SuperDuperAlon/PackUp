import { storageService } from './storage.service'
import { utilService } from './util.service'
// import usersDemoData from '@/users.json'

const STORAGE_KEY = 'user_db'
const API_URL = '/api/users';

export const userService = {
    // saveLocalUser,
    getUsers,
    getUserById,
    removeUser,
    save,
    getEmptyUser,
    getDefaultFilter
}

async function getUsers(filterBy) {
    try {
        const response = await fetch(API_URL + '?text=' + filterBy.text, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch packages');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching packages:', error);
        throw error;
    }
}


async function removeUser(userId) {
    console.log(userId);
    
    try {
        const response = await fetch(API_URL + '/' + userId, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete the package');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting the package:', error);
        throw error;
    }
}

async function getUserById(userId) {
    console.log(userId);
    
    try {
        const response = await fetch(API_URL + '/' + userId, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch the package');
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching the package:', error);
        throw error;
    }
}

async function save(u) {
    try {
        let response;
        if (u._id) {
            response = await fetch(API_URL + '/' + u._id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(u)
            });
        } else {
            response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(u)
            });
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error saving data:', error);
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