import clientPromise from '@/lib/mongo/index.js';

const DB_NAME = 'towerone_db';
const COLLECTION_NAME = 'admins';

const client = await clientPromise;
const db = client.db(DB_NAME);

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const regex = new RegExp(searchParams.get('username'), 'i');

    const admins = await db.collection(COLLECTION_NAME).find({ username: regex }).toArray();
    return new Response(JSON.stringify(admins), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch admins' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST(req) {

  try {
    const adminData = await req.json();
    const a = await db.collection(COLLECTION_NAME).insertOne(adminData);

    return new Response(JSON.stringify(a), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to post new admin' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 