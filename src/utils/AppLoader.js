import { useAppContext } from './AppContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';

export default function AppLoader({ children }) {
    const router = useRouter();
    const { isAuthenticated, isLoading, appState, logout } = useAppContext();
    useEffect(() => {
        if (!isLoading && !isAuthenticated && (router.pathname.includes("/dashboard") || router.pathname.includes("/account"))) {
            router.push("/login");
        }
    }, [isLoading, isAuthenticated, router.pathname]);
    if (!router.pathname.includes("/dashboard") && !router.pathname.includes("/account")) {
        return children
    }
    if (isLoading || (!isAuthenticated && router.pathname.includes("/dashboard"))) {
        return <Loading />
    }
    return children
}