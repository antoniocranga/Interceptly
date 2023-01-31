import { NextRequest, NextResponse } from 'next/server';
import { useAppContext } from './src/utils/AppContext';
export const middleware = async (request) => {
    // const {appState, setAppState} = useAppContext();

    // if (request.nextUrl.pathname.startsWith('/dashboard')) {
    //     const authCookie = localStorage.get('jwt');
    //     if (!authCookie) {
    //         return NextResponse.redirect(new URL('/login',request.url));
    //     }
    //     else {
    //         await appState.checkStatus();
    //         if(appState.statusChecked && appState.user == null){
    //             return NextResponse.redirect(new URL('/login',request.url));
    //         }
    //     }
    //     return NextResponse.next();
    // }
};
