export const authService = {
    login,
    logout,
    signup,
    getCurrentAdmin
}

async function login(adminCred) {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(adminCred),
        });

        if (!response.ok) {
            throw new Error(`Error during login: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.token;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
}

async function signup(adminCred) {
    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(adminCred),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Something went wrong');
        }

        return data.token;
    } catch (error) {
        console.error('Error during sign-up:', error);
        throw error;
    }
}

async function logout() {
    try {
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
        })
        if (!response.ok) {
            throw new Error('Failed to logout')
        }
    } catch (error) {
        console.error('Error during logout:', error)
    }
}
async function getCurrentAdmin() {
    try {
        const response = await fetch('/api/auth/getcurrentadmin');
        const data = await response.json();
        return data.admin;
    } catch (error) {
        console.error('Error fetching current admin:', error);
        return null;
    }
}