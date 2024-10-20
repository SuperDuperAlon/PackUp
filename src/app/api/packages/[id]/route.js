import clientPromise from "@/lib/mongo/index.js";
import { ObjectId } from "mongodb";

const DB_NAME = 'towerone_db';
const COLLECTION_NAME = 'packages';

const client = await clientPromise;
const db = client.db(DB_NAME);

export async function GET(req, { params }) {
    const id = params.id
    console.log(id);

    try {
        // Query MongoDB to find the package by ID
        const packageData = await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
        // If the package doesn't exist, return a 404 error
        if (!packageData) {
            return new Response(JSON.stringify({ message: 'Package not found' }), { status: 404 });
        }
        // Return the found package
        return new Response(JSON.stringify({ message: 'Package retrieved successfully', data: packageData }), { status: 200 });
    } catch (error) {
        console.error('Error retrieving the package:', error);
        return new Response(JSON.stringify({ message: 'Failed to retrieve package', error: error.message }), { status: 500 });
    }
}

export async function PUT(req, { params }) {
    const id = params.id
    const body = await req.json(); // Parse the request body for the updated data

    
    // console.log(id, body);
    
    try {
        const { _id, ...updateData } = body;
        const result = await db.collection(COLLECTION_NAME).updateOne(
            { _id: new ObjectId(id) }, // Find the package by ObjectId
            { $set: updateData } // Update the fields with the request body data
        );

        console.log(result);

        // Check if the update was successful
        if (result.matchedCount === 0) {
            return new Response(JSON.stringify({ message: 'Package not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: 'Package updated successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error updating the package:', error);
        return new Response(JSON.stringify({ message: 'Failed to update package', error: error.message }), { status: 500 });
    }
}