import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const authenticatedUser = (token) => {
        try {
            const decodedToken = jwtDecode(token); 
            if (decodedToken.exp * 1000 > Date.now()) {
                setUser(decodedToken);
            } else {
                toast.error('Session Expired');
                localStorage.removeItem('token');
            }
        } catch (error) {
            console.error('Error decoding token', error);
            localStorage.removeItem('token');
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            authenticatedUser(storedToken);
        }
    }, []);

  

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        navigate('/login'); 
    };

    const contextValue = {
        user,
        login,
        logout,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
