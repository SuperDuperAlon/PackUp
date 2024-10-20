import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Replace with your own secret key
const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export async function middleware(req) {
    const token = req.cookies.get('token')?.value;

    if (!token) {
        // If no token, redirect to the login page
        return NextResponse.redirect('http://localhost:3000/auth/login');
    }

    try {
        // Verify the JWT token using 'jose'
        const { payload } = await jwtVerify(token, SECRET_KEY);
        console.log(payload, 'payload-MW');
        

        // Extract user information from the token payload
        const userName = payload.username; // Assuming you encoded the user's name in the JWT
        console.log('User Name from JWT:', userName);

        // Pass the user name to the response headers
        const response = NextResponse.next();
        response.headers.set('X-User-Name', userName); // Optional: pass the user's name in a header

        return response;

    } catch (error) {
        console.error('Invalid token:', error);

        // If the token is invalid, redirect to the login page
        return NextResponse.redirect('http://localhost:3000/auth/login');
    }
}

// Apply middleware to protected routes
export const config = {
    matcher: ['/packages'], // List of routes to protect
};
