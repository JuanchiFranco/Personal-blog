'use client';

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
                const response = authService.checkAuth();
                if (response) {
                    setUser(response);
                    setIsAuthenticated(true);
                } else {
                    // No user is logged in, which is the expected initial state
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } catch (err) {
                // Only show actual errors, not the normal "not authenticated" state
                console.error('Auth check error:', err);
                setUser(null);
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
            const errorMessage = err.response?.data?.message || err.message || 'Error during login';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
        navigate.push('/auth/login');
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