import * as React from "react";
import { createContext, useContext } from "react";
import axios from "axios";
import Endpoints from "../api/endpoints";
import qs from "qs";
import { SnackbarProvider, useSnackbar } from 'notistack';

const AppContext = createContext();

export function AppWrapper({ children }) {
    const { enqueueSnackbar } = useSnackbar();

    const [appState, setAppState] = React.useState({
        statusChecked: false,
        error: null,
        user: null,
    });
    const [isLoading, setIsLoading] = React.useState(true);

    const checkStatus = async () => {
        console.log('intrat');
        axios
            .get(Endpoints.users)
            .then((res) => {
                console.log(res);
                setAppState({
                    ...appState,
                    statusChecked: true,
                    user: res.data,
                });
                setIsLoading(false);
            })
            .catch((err) => {
                if (localStorage.getItem("jwt")) {
                    localStorage.removeItem("jwt");
                    delete axios.defaults.headers["Authorization"];
                }
                console.log(err);
                setAppState({
                    ...appState,
                    statusChecked: true,
                    user: null,
                });
                setIsLoading(false);
            });
    };

    const login = (email, password) => {
        console.log(email, password);
        setIsLoading(true);
        axios.post(Endpoints.login, qs.stringify({ 'email': email, 'password': password })).then((res) => {
            console.log(res);
            setAppState({
                ...appState,
                statusChecked: true,
                user: res.data.user
            });
            localStorage.setItem('jwt', res.data.jwt);
            axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
                "jwt"
            )}`;
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            enqueueSnackbar('Please check your credentials!', {
                variant: 'error',
                autoHideDuration: 3000,

            });
            setAppState({
                ...appState,
                statusChecked: true,
                user: null
            })
            setIsLoading(false);
        });
    }

    const register = (email, password, firstName, lastName) => {
        axios.post(Endpoints.register, qs.stringify({ 'email': email, 'password': password, 'firstName': firstName, 'lastName': lastName, 'provider': 'LOCAL' })).then((res) => {
            setAppState({
                ...appState,
                statusChecked: true,
                user: res.data.user
            })
            localStorage.setItem('jwt', res.data.jwt);
            axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
                "jwt"
            )}`;
        }).catch((err) => {
            switch (err.response.status) {
                case 409:
                    enqueueSnackbar(err.response.data.error, {
                        variant: 'error',
                        autoHideDuration: 3000,
                    });
                    break;
                default:
                    enqueueSnackbar('An error has occured, try again!', {
                        variant: 'error',
                        autoHideDuration: 3000,
                    });
            }
            setAppState({
                ...appState,
                statusChecked: true,
                user: null
            })
        });
    }

    const logout = () => {
        localStorage.removeItem("jwt");
        delete axios.defaults.headers["Authorization"];
        setAppState({
            ...appState,
            statusChecked: false,
            user: null,
        });
        checkStatus();
    };

    React.useEffect(() => {
        axios.defaults.baseURL = Endpoints.baseUrl
        if (localStorage.getItem("jwt")) {
            axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
                "jwt"
            )}`;
        }
        checkStatus();
    }, []);

    return (
        <AppContext.Provider value={{ appState, setAppState, checkStatus, login, register, logout, isLoading, isAuthenticated: !!appState.user }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}