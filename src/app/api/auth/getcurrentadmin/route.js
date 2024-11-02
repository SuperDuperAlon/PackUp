import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY
const TOKEN = 'token'

export async function GET(req) {
    try {
        const token = req.cookies.get(TOKEN)?.value;
        if (!token) {
            const admin = null;
            return NextResponse.json({ admin }, { status: 200 });
        }
        const admin = jwt.verify(token, SECRET_KEY);
        return NextResponse.json({ admin }, { status: 200 });
    } catch (error) {
        console.error('Error verifying token:', error);
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
}


