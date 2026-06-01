import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAffiliateEntry, getSafeOutboundUrlForEntry } from "@/lib/affiliate";

type RouteProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, { params }: RouteProps) {
  const { slug } = await params;
  const entry = getAffiliateEntry(slug);
  const outboundUrl = getSafeOutboundUrlForEntry(entry);
  const headers = new Headers({
    "X-Robots-Tag": "noindex, nofollow",
    "Cache-Control": "no-store",
  });

  return NextResponse.redirect(outboundUrl ?? new URL("/software", request.url), {
    status: 302,
    headers,
  });
}
