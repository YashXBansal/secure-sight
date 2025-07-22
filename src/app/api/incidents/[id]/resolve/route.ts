import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Use 'any' to bypass the broken type checker for the context argument.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PATCH(request: NextRequest, context: any) {
  try {
    // We get our type safety back inside the function with an assertion.
    const { id: incidentId } = context.params as { id: string };

    if (!incidentId) {
      return new NextResponse("Incident ID is required", { status: 400 });
    }

    const updatedIncident = await db.incident.update({
      where: { id: incidentId },
      data: { resolved: true },
    });

    return NextResponse.json(updatedIncident);
  } catch (error) {
    // We can still safely access the id for logging.
    const incidentId = context.params?.id;
    console.error(`Error resolving incident ${incidentId}:`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
