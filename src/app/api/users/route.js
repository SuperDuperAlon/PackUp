import clientPromise from '@/lib/mongo/index.js';

const DB_NAME = 'towerone_db';
const COLLECTION_NAME = 'users';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const admins = await db.collection(COLLECTION_NAME).find({}).toArray();

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
    const userData = await req.json();
    const users = await db.collection(COLLECTION_NAME).insertOne(userData);
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch users' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 