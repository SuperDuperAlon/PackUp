import clientPromise from '@/lib/mongo/index.js';
import { NextResponse } from 'next/server';

const DB_NAME = 'towerone_db';
const COLLECTION_NAME = 'packages';

const client = await clientPromise;
const db = client.db(DB_NAME);

export async function GET(req) {
    try {
        const packages = await db.collection(COLLECTION_NAME).find({}).toArray();
        const headers = ["id",
            //  "receivingTenantApt", "receivingTenantFname", "receivingTenantFullTenantDesc", "isCollected"
            ];
        const csvRows = [headers.join(",")]; // Start with the headers

        packages.forEach(item => {
            const row = [
                item._id.toString(),
                // item.receivingTenantApt.toString() || "",
                // item.receivingTenantFname.toString() || "",
                // item.receivingTenantFullTenantDesc.toString() || "",
                // item.isCollected.toString() || "false",
            ];
            csvRows.push(row.join(",")); // Add the row to the CSV
        });

        const csvContent = csvRows.join("\n"); // Join rows with newline characters

        return new NextResponse(csvContent, {
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": `attachment; filename="data.csv"`,
            },
        });
    } catch (error) {
        console.error("Error exporting data:", error);
        return new NextResponse("Failed to export data", { status: 500 });
    }
}