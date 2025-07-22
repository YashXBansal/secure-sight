import { NextRequest, NextResponse } from "next/server";

// Define the context type explicitly to avoid any build-time bugs
interface RouteContext {
  params: {
    id: string;
  };
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const incidentId = context.params.id;
  
  // Return a simple JSON response without touching the database or anything else.
  // This is just to see if the build process can handle the file at all.
  return NextResponse.json({ 
    message: `Build test successful for incident ID: ${incidentId}` 
  });
}