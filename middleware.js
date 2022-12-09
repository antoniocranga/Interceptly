import { NextRequest, NextResponse } from 'next/server';
import { useAuthState } from './contexts/auth';
export const middleware = async (request) => {
    // if (request.nextUrl.pathname.startsWith('/dashboard')) {
    //     const authCookie = request.cookies.get('token');
    //     if (!authCookie) {
            
    //         return NextResponse.redirect(new URL('/login',request.url));
    //     }
    // }
};
