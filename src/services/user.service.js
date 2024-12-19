const API_URL = '/api/users';

export const userService = {
    getUsers,
    getUserById,
    removeUser,
    save,
    getEmptyUser,
    getDefaultFilter
}

async function getUsers(filterBy) {
    try {
        const response = await fetch(API_URL + '?receivingTenantFullTenantDesc=' + filterBy.receivingTenantFullTenantDesc, {
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
        receivingTenantFullTenantDesc: '',
        date: {
            startDate: '',
            endDate: ''
        }
    }
}