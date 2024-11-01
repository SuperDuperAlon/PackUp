import clientPromise from '@/lib/mongo/index.js';

const DB_NAME = 'towerone_db';
const COLLECTION_NAME = 'packages';

const client = await clientPromise;
const db = client.db(DB_NAME);

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = { receivingTenantFullTenantDesc: { $regex: searchParams.get('receivingTenantFullTenantDesc') } }
    const sortBy = searchParams.get('sortBy') || 'dateReceived'; // Default sort field
    const sortOrder = parseInt(searchParams.get('sortOrder')) || 1;

    const validSortFields = ['fullPackageDescription', 'apartmentReceiver', 'dateReceived', 'lobbyPackReceivedBy', 'notesOnArrival'];
    const sortCriteria = validSortFields.includes(sortBy) ? { [sortBy]: sortOrder } : { createdAt: 1 };


    const packages = await db.collection(COLLECTION_NAME).find(query).sort(sortCriteria).toArray();

    return new Response(JSON.stringify(packages), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch packages' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST(req) {
  try {
    const packageData = await req.json();
    const packages = await db.collection(COLLECTION_NAME).insertOne(packageData);
    return new Response(JSON.stringify(packages), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch packages' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 