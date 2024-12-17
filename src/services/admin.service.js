import { storageService } from './storage.service'
import { utilService } from './util.service'

const STORAGE_KEY_LOGGEDIN_ADMIN = 'loggedInAdmin'
const STORAGE_KEY = 'admin_db'
const API_URL = '/api/admins';

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
    try {
        const response = await fetch(API_URL + '?username=' + filterBy.username, {
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

// async function removeAdmin(adminId) {
//     return storageService.remove(STORAGE_KEY, adminId)
// }

async function removeAdmin(adminId) {
    try {
        const response = await fetch(API_URL + '/' + adminId, {
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

async function getAdminById(adminId) {
    try {
        const response = await fetch(API_URL + '/' + adminId, {
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

async function save(admin) {
    try {
        let response;
        if (admin._id) {
            response = await fetch(API_URL + '/' + admin._id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(admin)
            });
        } else {
            response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(admin)
            });
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error saving data:', error);
    }
}

function getEmptyAdmin() {
    return {
        username: '',
        password: '',
        isAdmin: false
    }
}

function getDefaultFilter() {
    return {
        username: '',
    }
}