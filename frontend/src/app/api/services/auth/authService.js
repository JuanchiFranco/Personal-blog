import apiClient from '../../config/axios';

const AuthService = {
    async login(email, password) {
        try {
            const response = await apiClient.post('/auth/login', { 
                email: email.trim(), 
                password: password.trim()
            });

            if (response.data?.user) {
                // Store user data in localStorage or sessionStorage
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }

            return response.data; // Return the token or user data
        } catch (error) {
            throw error;
        }
    },

    checkAuth() {
        const user = localStorage.getItem('user');
        if (user) {
            return JSON.parse(user);
        }
        throw new Error('User not authenticated');
    },

    logout() {
        localStorage.removeItem('user'); // Clear user data from storage
    },
}

export default AuthService;