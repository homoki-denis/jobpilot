"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createAuthActions } from "@insforge/sdk/ssr";

// 2. Internal imports
import { PKCE_VERIFIER_COOKIE } from "@/lib/utils";

// 3. Type definitions
type OAuthProvider = "google" | "github";

function getAuthActions(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return createAuthActions({
    baseUrl: process.env.NEXT_PUBLIC_INSFORGE_URL!,
    anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!,
    cookies: cookieStore,
  });
}

// signInWithOAuth always ends in a redirect (to the provider or back to
// /login on failure) rather than the { success, error } shape used
// elsewhere — redirect() throws internally and must not be caught, so it's
// called outside the try/catch per Next.js's documented Server Action rules.
async function startOAuthSignIn(provider: OAuthProvider) {
  const cookieStore = await cookies();
  const authActions = getAuthActions(cookieStore);

  let url: string | undefined;
  let codeVerifier: string | undefined;

  try {
    const { data, error } = await authActions.signInWithOAuth(provider, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/callback`,
    });
    if (error) {
      console.error("[actions/auth]", error.message);
    }
    url = data?.url;
    codeVerifier = data?.codeVerifier;
  } catch (error) {
    console.error("[actions/auth]", error);
  }

  if (!url) {
    redirect("/login?error=oauth_failed");
  }

  if (codeVerifier) {
    cookieStore.set(PKCE_VERIFIER_COOKIE, codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 600,
      path: "/",
    });
  }

  redirect(url);
}

export async function signInWithGoogle() {
  await startOAuthSignIn("google");
}

export async function signInWithGithub() {
  await startOAuthSignIn("github");
}

export async function signOutAction() {
  const cookieStore = await cookies();
  const authActions = getAuthActions(cookieStore);

  try {
    await authActions.signOut();
  } catch (error) {
    console.error("[actions/auth]", error);
  }

  redirect("/");
}
