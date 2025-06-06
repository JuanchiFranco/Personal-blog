import { useState, useEffect, useCallback, use } from 'react';
import { useRouter } from 'next/navigation';
import authService from '../app/api/services/auth/authService';

export function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await authService.checkAuth();
                if (response.user) {
                    setUser(response.user);
                    setIsAuthenticated(true);
                }
            } catch (err) {
                setError(err);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = useCallback(async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.login(email, password);
            setUser(response.user);
            setIsAuthenticated(true);
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
            
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
        navigate.push('/login');
    }, [navigate]);

    return {
        user,
        loading,
        error,
        isAuthenticated,
        login,
        logout,
        getUser: authService.checkAuth
    };
}