import clientPromise from '@/lib/mongo/index.js';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('towerone_db');

    const admins = await db.collection('admins').find({}).toArray();
    
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