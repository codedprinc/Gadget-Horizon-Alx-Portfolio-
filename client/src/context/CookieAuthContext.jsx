// context/CookieAuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const CookieAuthContext = createContext(null);

export const CookieAuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [useLocalStorage, setUseLocalStorage] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = Cookies.get('token') || localStorage.getItem('userToken');
        if (token) {
            try {
                const response = await axios.get('http://localhost:5555/api/users/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data);
            } catch (error) {
                Cookies.remove('token');
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
            
            // Ask for cookie permission
            if (!useLocalStorage) {
                const useCookies = window.confirm(
                    'Would you like to enable cookies for persistent login? Click OK to enable cookies, or Cancel to use local storage.'
                );
                setUseLocalStorage(!useCookies);
                
                if (useCookies) {
                    Cookies.set('token', token, { expires: 7 }); // 7 days expiry
                } else {
                    localStorage.setItem('userToken', token);
                }
            } else {
                localStorage.setItem('userToken', token);
            }
            
            setUser(userData);
            return true;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    };

    const logout = () => {
        Cookies.remove('token');
        localStorage.removeItem('userToken');
        setUser(null);
    };

    return (
        <CookieAuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </CookieAuthContext.Provider>
    );
};

export const useCookieAuth = () => {
    const context = useContext(CookieAuthContext);
    if (!context) {
        throw new Error('useCookieAuth must be used within a CookieAuthProvider');
    }
    return context;
};

