import clientPromise from "@/lib/mongo/index.js";
import { ObjectId } from "mongodb";

const DB_NAME = 'towerone_db';
const COLLECTION_NAME = 'users';

const client = await clientPromise;
const db = client.db(DB_NAME);

export async function GET(req, { params }) {
    const id = params.userId
    console.log(id);
    
    try {
        const userData = await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });

        if (!userData) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: 'User retrieved successfully', data: userData }), { status: 200 });
    } catch (error) {
        console.error('Error retrieving the user:', error);
        return new Response(JSON.stringify({ message: 'Failed to retrieve user', error: error.message }), { status: 500 });
    }
}

export async function PUT(req, { params }) {
    const id = params.userId
    const body = await req.json();

    try {
        const { _id, ...updateData } = body;
        const result = await db.collection(COLLECTION_NAME).updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: 'User updated successfully' }), { status: 200 });

    } catch (error) {
        console.error('Error updating the user:', error);
        return new Response(JSON.stringify({ message: 'Failed to update user', error: error.message }), { status: 500 });
    }
}