// context/LocalStorageAuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const LocalStorageAuthContext = createContext(null);

export const LocalStorageAuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem('userToken');
        if (token) {
            try {
                const response = await axios.get('http://localhost:5555/api/users/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data);
            } catch (error) {
                localStorage.removeItem('userToken');
            }
        }
        setLoading(false);
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5555/api/users/login', {
                email,
                password
            });
            
            const { token, user: userData } = response.data;
            localStorage.setItem('userToken', token);
            setUser(userData);
            return true;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    };

    const logout = () => {
        localStorage.removeItem('userToken');
        setUser(null);
    };

    return (
        <LocalStorageAuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </LocalStorageAuthContext.Provider>
    );
};

export const useLocalStorageAuth = () => {
    const context = useContext(LocalStorageAuthContext);
    if (!context) {
        throw new Error('useLocalStorageAuth must be used within a LocalStorageAuthProvider');
    }
    return context;
};