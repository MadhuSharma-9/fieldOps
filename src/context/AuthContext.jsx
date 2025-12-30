import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 1. Check if user is logged in on load
    useEffect(() => {
        checkUserStatus();
    }, []);

    const checkUserStatus = () => {
        const token = localStorage.getItem('access_token');
        if (token) {
            // We assume the user is logged in if token exists
            // Ideally, you'd decode the token here to get the username
            setUser({ token: token }); 
        }
        setLoading(false);
    };

    // 2. Login Function
    const login = async (username, password) => {
        try {
            const res = await axios.post('https://fieldopsbackend.onrender.com/api/login/', {
                username,
                password
            });
            
            // Save tokens
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
            
            setUser({ username: username }); // Set user state
            return { success: true };
        } catch (error) {
            console.error("Login failed", error);
            return { success: false, error: error.response?.data?.detail || "Login failed" };
        }
    };

    // 3. Register Function
    const register = async (username, email, password) => {
        try {
            await axios.post('https://fieldopsbackend.onrender.com/api/register/', {
                username,
                email,
                password
            });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data || "Registration failed" };
        }
    };

    // 4. Logout Function
    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
        // Optional: Redirect to login is handled by components checking !user
    };

    // --- INTERCEPTOR: The "401 Auto-Fixer" ---
    // This watches every single request. If the backend says "401 Unauthorized",
    // it automatically logs the user out.
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            response => response, // If response is good, just return it
            error => {
                if (error.response && error.response.status === 401) {
                    // Token expired or invalid -> Logout user
                    console.warn("Session expired. Logging out...");
                    logout();
                }
                return Promise.reject(error);
            }
        );

        // Cleanup interceptor when component unmounts
        return () => axios.interceptors.response.eject(interceptor);
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
