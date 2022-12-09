// contexts/auth.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import Router, { useRouter } from 'next/router';

//api here is an axios instance which has the baseURL set according to the env.
import api from '../services/api';
import { NextResponse } from 'next/server';
import { CircularProgress } from '@mui/material';
import { Container } from '@mui/system';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadUserFromCookies() {
            const token = Cookies.get('token');
            if (token) {
                console.log("Got a token in the cookies, let's see if it is valid");
                api.defaults.headers.Authorization = `Bearer ${token}`;
                const { data: user } = await api.get('users/me');
                if (user) setUser(user);
            }
            setIsLoading(false);
        }
        loadUserFromCookies();
    }, []);

    const login = async (email, password) => {
        setUser({});
        const { data: token } = await api.post('auth/login', { email, password });
        if (token) {
            console.log('Got token');
            Cookies.set('token', token, { expires: 60 });
            api.defaults.headers.Authorization = `Bearer ${token.token}`;
            const { data: user } = await api.get('users/me');
            setUser(user);
            console.log('Got user', user);
        }
    };

    const logout = (email, password) => {
        Cookies.remove('token');
        setUser(null);
        delete api.defaults.headers.Authorization;
        router.push('/login');
    };

    return <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, isLoading, logout }}>{children}</AuthContext.Provider>;
};

export const useAuthState = () => useContext(AuthContext);
export const useAuthContextState = () => {
    const { state } = useContext(AuthContext);
    return state;
};
// export const ProtectRoute = ({ children }) => {
//     const router = useRouter();
//     if (!router.pathname.includes('/dashboard')) {
//         return children;
//     }
//     const { isAuthenticated, isLoading } = useAuthState();
//     if (isLoading) {
//         return (
//             <Container
//                 sx={{
//                     height: '100vh',
//                     width: '100vw'
//                 }}
//             >
//                 <CircularProgress />
//             </Container>
//         );
//     }
//     if (!isAuthenticated && router.pathname.includes('/dashboard')) {
//         router.push('/login');
//     }
//     return children;
// };
