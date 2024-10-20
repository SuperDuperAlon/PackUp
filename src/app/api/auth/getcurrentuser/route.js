import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY

// Handler for GET requests
export async function GET(req) {
    try {
        // Get cookies from the request
        const cookies = req.cookies;
        console.log(cookies, 'cookies');
        
        // Extract the auth token from the cookies
        const token = cookies.get('token')?.value;
        console.log(token, 'get token');

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        // Verify the JWT token
        const user = jwt.verify(token, SECRET_KEY);
        console.log(user, 'user');

        // If token is valid, return the user information
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error('Error verifying token:', error);
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
}
