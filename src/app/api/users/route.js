import clientPromise from '@/lib/mongo/index.js';

const DB_NAME = 'towerone_db';
const COLLECTION_NAME = 'users';

const client = await clientPromise;
const db = client.db(DB_NAME);

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    console.log(searchParams.get('receivingTenantFullTenantDesc'));
    const regex = new RegExp(searchParams.get('receivingTenantFullTenantDesc'), 'i');

    const users = await db
      .collection(COLLECTION_NAME)
      .find({
        $or: [
          { firstName: regex },
          { lastName: regex },
          { apartmentNumber: regex },
          { fullUserDescription: regex },
        ],
      })
      .toArray();

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

export async function POST(req) {
  try {
    const userData = await req.json();
    const u = await db.collection(COLLECTION_NAME).insertOne(userData);

    return new Response(JSON.stringify(u), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to post new user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 