import Link from "next/link";

// 2. Internal imports
import { buttonVariants } from "@/components/ui/button";

// 4. Component
export function CTASection() {
  return (
    <section className="px-6 pb-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="rounded-3xl bg-gradient-to-br from-info-light via-background to-accent-light px-6 py-16 text-center sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl leading-tight font-bold text-text-primary sm:text-4xl">
            Your next job search can feel a lot less overwhelming
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm text-text-secondary sm:text-base">
            Set up your profile, upload your resume, and start finding
            matches in minutes.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/login" className={buttonVariants("dark")}>
              Get Started
            </Link>
            <Link href="/login" className={buttonVariants("secondary")}>
              Find Your First Match
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
