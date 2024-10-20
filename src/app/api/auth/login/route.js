import clientPromise from '@/lib/mongo/index.js';
import jwt from 'jsonwebtoken';

const DB_NAME = 'towerone_db';
const COLLECTION_NAME = 'admins';

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db(DB_NAME);
        const admin = await db.collection(COLLECTION_NAME).findOne({ email });

        if (!admin) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        const token = jwt.sign(admin, process.env.JWT_SECRET_KEY);

        return new Response(JSON.stringify({ token }), {
            status: 200,
            headers: {
                'Set-Cookie': `token=${token}; HttpOnly; Secure; Max-Age=3600; Path=/`,
                'Content-Type': 'application/json'
            },
        })

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error logging in' }), { status: 500 });
    }
}

