import { NextResponse } from "next/server";

type GoogleTokenInfo = {
  aud?: string;
  iss?: string;
  sub?: string;
  email?: string;
  email_verified?: string;
  name?: string;
  picture?: string;
  exp?: string;
};

export async function POST(request: Request) {
  try {
    const { credential } = (await request.json()) as { credential?: string };
    const clientId = process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId || !credential) {
      return NextResponse.json({ message: "Google sign-in is not configured." }, { status: 503 });
    }

    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`, {
      cache: "no-store",
    });
    const token = (await response.json()) as GoogleTokenInfo;
    const expiresAt = Number(token.exp || 0);
    const validIssuer = token.iss === "accounts.google.com" || token.iss === "https://accounts.google.com";
    if (!response.ok || token.aud !== clientId || !validIssuer || token.email_verified !== "true" || !token.sub || !token.email || (expiresAt && expiresAt * 1000 < Date.now())) {
      return NextResponse.json({ message: "Google sign-in could not be verified." }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: token.sub,
        name: token.name || token.email.split("@")[0],
        email: token.email,
        phone: "",
        picture: token.picture || "",
        provider: "google",
      },
    });
  } catch {
    return NextResponse.json({ message: "Google sign-in failed. Please try again." }, { status: 400 });
  }
}
