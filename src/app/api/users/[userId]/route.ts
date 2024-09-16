import { NextResponse } from "next/server";
import data from "@/data.json";

export async function GET(request: Request, context: any) {
    const { params } = context;
    const user = data.filter((u) => params.userId === u.id.toString());
    return NextResponse.json({ user, });
}