import clientPromise from "@/lib/mongo/index.js";
import { ObjectId } from "mongodb";

const DB_NAME = 'towerone_db';
const COLLECTION_NAME = 'admins';

const client = await clientPromise;
const db = client.db(DB_NAME);

export async function GET(req, { params }) {
    const id = params.id

    try {
        const adminData = await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });

        if (!adminData) {
            return new Response(JSON.stringify({ message: 'Admin not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: 'Admin retrieved successfully', data: adminData }), { status: 200 });
    } catch (error) {
        console.error('Error retrieving the admin:', error);
        return new Response(JSON.stringify({ message: 'Failed to retrieve admin', error: error.message }), { status: 500 });
    }
}

export async function PUT(req, { params }) {
    const id = params.id
    const body = await req.json();

    try {
        const { _id, ...updateData } = body;
        const result = await db.collection(COLLECTION_NAME).updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return new Response(JSON.stringify({ message: 'Admin not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: 'Admin updated successfully' }), { status: 200 });

    } catch (error) {
        console.error('Error updating the admin:', error);
        return new Response(JSON.stringify({ message: 'Failed to update admin', error: error.message }), { status: 500 });
    }
}