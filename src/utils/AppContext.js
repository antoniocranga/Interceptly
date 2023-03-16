import * as React from 'react';
import { createContext, useContext } from 'react';
import axios from 'axios';
import Endpoints from '../api/endpoints';
import qs from 'qs';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { StompSessionProvider, useSubscription } from 'react-stomp-hooks';

const AppContext = createContext();

export function AppWrapper({ children }) {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const [appState, setAppState] = React.useState({
        statusChecked: false,
        error: null,
        user: null
    });

    const [notifications, setNotifications] = React.useState(null);

    const [isLoading, setIsLoading] = React.useState(true);

    const fetchNotifications = () => {
        axios
            .get(`${Endpoints.notifications}`)
            .then((data) => {
                setNotifications(data.data)
            })
            .catch((err) => {});
    };

    const checkStatus = async () => {
        axios
            .get(Endpoints.users)
            .then((res) => {
                setAppState({
                    ...appState,
                    statusChecked: true,
                    user: res.data
                });
                fetchNotifications();
                openSocket();
                setIsLoading(false);
            })
            .catch((err) => {
                if (localStorage.getItem('jwt')) {
                    localStorage.removeItem('jwt');
                    delete axios.defaults.headers['Authorization'];
                }
                setAppState({
                    ...appState,
                    statusChecked: true,
                    user: null
                });
                setNotifications(null);
                setIsLoading(false);
            });
    };

    const login = (email, password) => {
        setIsLoading(true);
        axios
            .post(Endpoints.login, qs.stringify({ email: email, password: password }))
            .then((res) => {
                setAppState({
                    ...appState,
                    statusChecked: true,
                    user: res.data.user
                });
                localStorage.setItem('jwt', res.data.jwt);
                axios.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`;
                fetchNotifications();
                openSocket();
                setIsLoading(false);
            })
            .catch((err) => {
                enqueueSnackbar('Please check your credentials!', {
                    variant: 'error',
                    autoHideDuration: 3000
                });
                setAppState({
                    ...appState,
                    statusChecked: true,
                    user: null
                });
                setIsLoading(false);
            });
    };

    const register = (email, password, firstName, lastName) => {
        axios
            .post(
                Endpoints.register,
                qs.stringify({ email: email, password: password, firstName: firstName, lastName: lastName, provider: 'LOCAL' })
            )
            .then((res) => {
                setAppState({
                    ...appState,
                    statusChecked: true,
                    user: res.data.user
                });
                localStorage.setItem('jwt', res.data.jwt);
                axios.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`;
                fetchNotifications();
                openSocket();
            })
            .catch((err) => {
                switch (err.response.status) {
                    case 409:
                        enqueueSnackbar(err.response.data.error, {
                            variant: 'error',
                            autoHideDuration: 3000
                        });
                        break;
                    default:
                        enqueueSnackbar('An error has occured, try again!', {
                            variant: 'error',
                            autoHideDuration: 3000
                        });
                }
                setAppState({
                    ...appState,
                    statusChecked: true,
                    user: null
                });
            });
    };

    const logout = () => {
        localStorage.removeItem('jwt');
        delete axios.defaults.headers['Authorization'];
        setAppState({
            ...appState,
            statusChecked: false,
            user: null
        });
        checkStatus();
    };

    const openSocket = () => {
        var socket = null;
        var privateStompClient = null;
        const headers = {
            "Authorization": "Bearer " + localStorage.getItem('jwt')
        }
        socket = new SockJS(Endpoints.webSocketsUrl)
        privateStompClient = Stomp.over(socket);
        privateStompClient.connect(headers, function(frame){
            privateStompClient.subscribe('/user/specific', function (result) {
                setNotifications((prev) => [JSON.parse(result.body),...prev]);
            });
        });
    };

    React.useEffect(() => {
        console.log(Endpoints.baseUrl);
        axios.defaults.baseURL = Endpoints.baseUrl;
        if (localStorage.getItem('jwt')) {
            axios.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`;
        }
        axios.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                const { config, response } = error;
                if (response) {
                    if(router.pathname.includes("/dashboard")){
                        if (response?.status === 401) {
                            router.push('/');
                        } else if (response?.status === 403) {
                            router.push('/dashboard');
                        }
                    }
                }
                //   if (response && response?.status === 401) {
                //     router.push('/401');
                //   } else if (
                //     response?.data &&
                //     (
                //       response?.status === 500 ||
                //       response?.status === 400
                //     )
                //   ) {
                //     if (typeof response.data?.error === 'string') {
                //       toast.error(response.data?.error, { duration: 3000 })
                //     } else {
                //       toast.error('Houve um erro desconhecido. Tente novamente ou contate o suporte!', { duration: 3000 })
                //     }
                //   } else if (response?.data && response?.status === 409) {
                //     if (response.data.message) {
                //       response.data.message.map((item: { message }) => {
                //         toast.error(item.message, { duration: 3000 })
                //       })
                //     } else {
                //       toast.error(response.data.error, { duration: 3000 })
                //     }
                //   } else if (error?.code === "ERR_NETWORK") {
                //     toast.error('Ops! Houve de conexão. Tente novamente.', { duration: 3000 })
                //   } else {
                //     toast.error('Ops! Houve um erro desconhecido ao executar esta ação', { duration: 3000 })
                //   }
                //   console.log('ok, errors 2')
                return Promise.reject(error);
            }
        );
        checkStatus();
    }, []);

    return (
        <AppContext.Provider
            value={{
                appState,
                setAppState,
                checkStatus,
                login,
                register,
                logout,
                isLoading,
                isAuthenticated: !!appState.user,
                notifications,
                setNotifications
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
