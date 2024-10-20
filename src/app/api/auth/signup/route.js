// TODO: Sign up - test

import clientPromise from '@/lib/mongo/index.js';

import jwt from 'jsonwebtoken';

const DB_NAME = 'towerone_db';
const COLLECTION_NAME = 'admins';




export async function POST(req) {
    const { username, email, password } = await req.json();
    console.log(username, email, password);


    if (!username || !email || !password) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    try {
        const client = await clientPromise;
        const db = client.db(DB_NAME);

        const existingUser = await db.collection(COLLECTION_NAME).findOne({ email });

        if (existingUser) {
            return new Response(JSON.stringify({ error: 'User already exists' }), { status: 400 });
        }

        await db.collection(COLLECTION_NAME).insertOne({
            username,
            email,
            password,
        });

        const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        return new Response(JSON.stringify({ token }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error creating user' }), { status: 500 });
    }
}