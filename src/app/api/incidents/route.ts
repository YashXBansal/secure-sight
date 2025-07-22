import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const resolvedParam = searchParams.get("resolved");

    const where = resolvedParam ? { resolved: resolvedParam === "true" } : {};

    const incidents = await db.incident.findMany({
      where,
      include: { camera: true },
      orderBy: { tsStart: "desc" },
    });

    return NextResponse.json(incidents);
  } catch (error) {
    console.error("Error fetching incidents:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
