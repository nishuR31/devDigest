import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const target = request.nextUrl.searchParams.get("target");

  if (!target) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const url = new URL(target);
    // In a real app, you would log metrics here (e.g., to a database) before redirecting.
    // This hides the actual outbound affiliate link from the DOM, thwarting basic ad blockers.
    return NextResponse.redirect(url);
  } catch {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
