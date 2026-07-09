import { NextRequest, NextResponse } from "next/server";
import { createAuthActions } from "@insforge/sdk/ssr";

// 2. Internal imports
import { PKCE_VERIFIER_COOKIE } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("insforge_code");

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=oauth_failed", request.url));
  }

  const codeVerifier = request.cookies.get(PKCE_VERIFIER_COOKIE)?.value;
  const response = NextResponse.redirect(new URL("/dashboard", request.url));

  try {
    const authActions = createAuthActions({
      baseUrl: process.env.NEXT_PUBLIC_INSFORGE_URL!,
      anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!,
      requestCookies: request.cookies,
      responseCookies: response.cookies,
    });

    const { error } = await authActions.exchangeOAuthCode(code, codeVerifier);

    if (error) {
      console.error("[callback/route]", error.message);
      return NextResponse.redirect(new URL("/login?error=oauth_failed", request.url));
    }
  } catch (error) {
    console.error("[callback/route]", error);
    return NextResponse.redirect(new URL("/login?error=oauth_failed", request.url));
  }

  response.cookies.delete(PKCE_VERIFIER_COOKIE);
  return response;
}
