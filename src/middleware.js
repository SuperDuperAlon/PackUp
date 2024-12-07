import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export async function middleware(req) {
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.redirect('http://localhost:3000/auth/login');
    }

    try {
        const { payload } = await jwtVerify(token, SECRET_KEY);
        const userName = payload.username;
        const response = NextResponse.next();
        response.headers.set('X-User-Name', encodeURIComponent(userName));
        return response;
    } catch (error) {
        console.error('Invalid token:', error);
        return NextResponse.redirect('http://localhost:3000/auth/login');
    }
}

export const config = {
    matcher: ['/packages', '/admin', '/users'],
};
