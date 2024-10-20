import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY   
const TOKEN = 'token'

// Handler for GET requests
export async function GET(req) {
    try {
        // Get cookies from the request
        const token = req.cookies.get(TOKEN)?.value;

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        // Verify the JWT token
        const admin = jwt.verify(token, SECRET_KEY);

        // If token is valid, return the user information
        return NextResponse.json({ admin }, { status: 200 });
    } catch (error) {
        console.error('Error verifying token:', error);
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
}
