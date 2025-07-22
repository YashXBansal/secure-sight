import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Define the type for the context object explicitly
interface RouteContext {
  params: {
    id: string;
  };
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    // Access the id from the context object
    const incidentId = context.params.id;

    if (!incidentId) {
      return new NextResponse("Incident ID is required", { status: 400 });
    }

    const updatedIncident = await prisma.incident.update({
      where: { id: incidentId },
      data: { resolved: true },
    });

    return NextResponse.json(updatedIncident);
  } catch (error) {
    // Log the id from the context object
    console.error(`Error resolving incident ${context.params?.id}:`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
