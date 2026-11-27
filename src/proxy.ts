import { type NextRequest, NextResponse } from "next/server";

const colourSlugs: Record<string, readonly string[]> = {
  "350-gsm-fleece-hoodie": ["black", "coffee-brown", "off-white", "olive-green", "beige"],
  "350-gsm-fleece-sweatshirt": ["black", "navy-blue", "off-white", "maroon", "lavender"],
};

export function proxy(request: NextRequest) {
  const baseSlug = request.nextUrl.pathname.split("/").pop();
  const colour = request.nextUrl.searchParams.get("colour");

  if (!baseSlug || !colour || !colourSlugs[baseSlug]?.includes(colour)) {
    return NextResponse.next();
  }

  const destination = request.nextUrl.clone();
  destination.pathname = `/products/${baseSlug}-${colour}`;
  destination.search = "";
  return NextResponse.redirect(destination, 301);
}

export const config = {
  matcher: ["/products/350-gsm-fleece-hoodie", "/products/350-gsm-fleece-sweatshirt"],
};
