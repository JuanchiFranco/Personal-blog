import apiClient from '../../config/axios';

const AuthService = {
    async register(username, email, password) {
        try {
            const response = await apiClient.post('/auth/register', { 
                username: username.trim(), 
                email: email.trim(), 
                password: password.trim() 
            });

            if (response.data?.user) {
                // Store user data in localStorage or sessionStorage
                localStorage.setItem('user', JSON.stringify(response.data.user));

                // guardamos el token de acceso en localStorage
                localStorage.setItem('token', response.data.user.token);
            }

            return response.data?.user; // Return the user data
        } catch (error) {
            throw error;
        }
    },

    async login(email, password) {
        try {
            const response = await apiClient.post('/auth/login', { 
                email: email.trim(), 
                password: password.trim()
            });

            if (response.data?.user) {
                // Store user data in localStorage or sessionStorage
                localStorage.setItem('user', JSON.stringify(response.data.user));

                // guardamos el token de acceso en localStorage
                localStorage.setItem('token', response.data.user.token);
            }

            return response.data?.user; // Return the token or user data
        } catch (error) {
            throw error;
        }
    },

    checkAuth() {
        if (typeof window === 'undefined') {
            return null; // Return null during server-side rendering
        }
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    logout() {
        localStorage.removeItem('user'); // Clear user data from storage
    },
}

export default AuthService;