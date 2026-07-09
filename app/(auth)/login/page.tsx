import Image from "next/image";

// 2. Internal imports
import { signInWithGoogle, signInWithGithub } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/ui/GoogleIcon";
import { GitHubIcon } from "@/components/ui/GitHubIcon";

// 3. Type definitions
type Props = {
  searchParams: Promise<{ error?: string }>;
};

const ERROR_MESSAGES: Record<string, string> = {
  oauth_failed: "Sign in failed. Please try again.",
};

// 4. Component
export default async function LoginPage({ searchParams }: Props) {
  const { error } = await searchParams;
  const errorMessage = error ? ERROR_MESSAGES[error] : undefined;

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-6 shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]">
        <div className="flex justify-center">
          <Image src="/logo.png" alt="JobPilot" width={496} height={168} priority className="h-8 w-auto" />
        </div>

        <h1 className="mt-6 text-center text-base font-semibold text-text-primary">
          Welcome to JobPilot
        </h1>
        <p className="mt-1 text-center text-xs text-text-muted">
          Sign in to start finding your next role
        </p>

        {errorMessage && (
          <p className="mt-4 rounded-md bg-error/10 px-3 py-2 text-center text-xs text-error">
            {errorMessage}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-3">
          <form action={signInWithGoogle}>
            <Button type="submit" variant="secondary" className="w-full gap-2">
              <GoogleIcon className="h-4 w-4" />
              Continue with Google
            </Button>
          </form>

          <form action={signInWithGithub}>
            <Button type="submit" variant="secondary" className="w-full gap-2">
              <GitHubIcon className="h-4 w-4" />
              Continue with GitHub
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
