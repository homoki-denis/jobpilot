import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// 2. Internal imports
import { buttonVariants } from "@/components/ui/button";

// 4. Component
export function Hero() {
  return (
    <section className="px-6 pt-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="rounded-3xl bg-gradient-to-br from-accent-light via-background to-info-light px-6 py-20 text-center sm:px-12">
          <h1 className="mx-auto max-w-3xl text-4xl leading-tight font-bold text-text-primary sm:text-5xl">
            Job hunting is hard.
            <br />
            Your tools shouldn&apos;t be.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm text-text-secondary sm:text-base">
            Stop applying blind. JobPilot finds the jobs, researches the
            companies, and gives you everything you need to stand out.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/login" className={buttonVariants("dark")}>
              Get Started
              <ArrowRight className="size-4" />
            </Link>
            <Link href="/login" className={buttonVariants("secondary")}>
              Find Your First Match
            </Link>
          </div>
        </div>

        <div className="-mt-12 rounded-2xl border border-border bg-surface p-4 shadow-sm sm:-mt-16 sm:p-6">
          <Image
            src="/images/dashboard-demo.png"
            alt="JobPilot dashboard preview"
            width={4788}
            height={2416}
            priority
            className="w-full rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}
