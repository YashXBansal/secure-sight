import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const incidentId = (await params).id;

    if (!incidentId) {
      return new NextResponse("Incident ID is required", { status: 400 });
    }
    const updatedIncident = await prisma.incident.update({
      where: { id: incidentId },
      data: { resolved: true },
    });
    return NextResponse.json(updatedIncident);
  } catch (error) {
    console.error(`Error resolving incident ${params}:`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
