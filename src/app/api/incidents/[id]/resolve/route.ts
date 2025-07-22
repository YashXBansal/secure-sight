import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // By consuming the request body, we satisfy Next.js's expectation
    // that PATCH handlers should be treated as fully async.
    // We use req.text() as it's safe even if no body is sent.
    await req.text();

    const incidentId = params.id;

    if (!incidentId) {
      return new NextResponse("Incident ID is required", { status: 400 });
    }

    const incident = await db.incident.findUnique({
      where: { id: incidentId },
    });

    if (!incident) {
      return new NextResponse("Incident not found", { status: 404 });
    }

    const updatedIncident = await db.incident.update({
      where: { id: incidentId },
      data: { resolved: !incident.resolved },
    });

    return NextResponse.json(updatedIncident);
  } catch (error) {
    console.error("[PATCH /api/incidents/[id]/resolve] Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}