'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login, register, logout, isAuthenticated } from '@/services/authService';

interface User {
    username: string;
    // Add other user properties as needed
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
    checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const checkAuth = () => {
        setIsLoading(true);
        if (isAuthenticated()) {
            // TODO: Fetch user profile to get username/details
            // For now, we just assume logged in if token exists
            setUser({ username: 'User' });
        } else {
            setUser(null);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const handleLogin = async (username: string, password: string) => {
        setIsLoading(true);
        try {
            await login(username, password);
            // After login, fetch profile or set mocking user
            setUser({ username });
            router.push('/');
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            await register(email, password);
            setUser({ username: email });
            router.push('/');
        } catch (error) {
            console.error("Registration failed", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login: handleLogin, register: handleRegister, logout: handleLogout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
