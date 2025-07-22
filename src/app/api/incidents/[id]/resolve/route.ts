// app/api/incidents/[id]/resolve/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  _request: NextRequest,
  // This is the correct, non-Promise type
  { params }: { params: { id: string } }
) {
  try {
    // No 'await' needed here
    const incidentId = params.id;

    if (!incidentId) {
      return new NextResponse("Incident ID is required", { status: 400 });
    }

    const updatedIncident = await prisma.incident.update({
      where: { id: incidentId },
      data: { resolved: true },
    });

    return NextResponse.json(updatedIncident);
  } catch (error) {
    // You can safely log params.id here if you want
    console.error(`Error resolving incident ${params?.id}:`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
