import Link from "next/link";

// 2. Internal imports
import { buttonVariants } from "@/components/ui/button";

// 3. Type definitions
type Props = {
  title: string;
};

// 4. Component
export function ComingSoon({ title }: Props) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-6 text-center shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]">
        <h1 className="text-base font-semibold text-text-primary">{title}</h1>
        <p className="mt-1 text-xs text-text-muted">
          This page is still being built. Check back soon.
        </p>
        <Link href="/" className={`mt-6 ${buttonVariants("secondary")}`}>
          Back to Home
        </Link>
      </div>
    </main>
  );
}
