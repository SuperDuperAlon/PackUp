import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY
const TOKEN = 'token'

// Handler for GET requests
export async function GET(req) {
    try {
        // Get cookies from the request
        const token = req.cookies.get(TOKEN)?.value;
        // console.log(token);
        

        if (!token) {
            const admin = null;
            return NextResponse.json({ admin }, { status: 200 });
        }

        // Verify the JWT token
        const admin = jwt.verify(token, SECRET_KEY);
        // If token is valid, return the admin information
        return NextResponse.json({ admin }, { status: 200 });
    } catch (error) {
        console.error('Error verifying token:', error);
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
}


