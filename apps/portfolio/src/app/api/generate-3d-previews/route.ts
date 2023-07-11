import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import generate3DPreviews from "@/browser-automation/generate-3d-previews";

export async function GET(request: NextRequest) {
  try {
    await generate3DPreviews();

    return NextResponse.json(
      {
        body: request.body,
        path: request.nextUrl.pathname,
        query: request.nextUrl.search,
        cookies: request.cookies.getAll(),
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    return NextResponse.json(
      {
        body: `ERROR: ${(e as Error).message}`,
      },
      {
        status: 500,
      }
    );
  }
}
