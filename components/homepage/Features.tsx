import Image from "next/image";

// 3. Type definitions
type FeatureItem = {
  title: string;
  description: string;
  highlighted?: boolean;
};

const jobSearchFeatures: FeatureItem[] = [
  {
    title: "Find jobs that actually fit",
    description:
      "Search by title and location or paste a job link. Get matched roles you can quickly scan.",
    highlighted: true,
  },
  {
    title: "Know the Company Before You Apply",
    description:
      "Stop guessing what a company is about. JobPilot browses their site and gives you everything you need to apply with confidence.",
  },
  {
    title: "Keep track of every application",
    description:
      "Keep a clear view of every job you've found, tailored. Your activity and progress all stay in one simple place.",
  },
];

const confidenceFeatures: FeatureItem[] = [
  {
    title: "Understand your match score",
    description:
      "See how your profile lines up with each role before you apply. Get a clear breakdown of what fits and what's missing.",
  },
  {
    title: "AI-Powered Job Matching",
    description:
      "Stop guessing which jobs are worth applying to. JobPilot scores every role against your actual skills so you focus on the ones that matter.",
    highlighted: true,
  },
  {
    title: "Focus on the right roles",
    description:
      "Filter out low fit jobs and stay on the ones that actually matter. Spend less time sorting and more time applying.",
  },
];

function FeatureList({ items }: { items: FeatureItem[] }) {
  return (
    <div className="mt-8 flex flex-col gap-6">
      {items.map((item) => (
        <div
          key={item.title}
          className={`border-l-2 pl-4 ${
            item.highlighted ? "border-accent" : "border-border-muted"
          }`}
        >
          <p className="text-sm font-semibold text-text-primary">
            {item.title}
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}

// 4. Component
export function Features() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-16">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
            Manage Your Job Search With Ease
          </h2>
          <FeatureList items={jobSearchFeatures} />
        </div>

        <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
          <Image
            src="/images/jobs-lists.png"
            alt="Jobs matched to your profile"
            width={2364}
            height={1778}
            className="w-full rounded-lg"
          />
        </div>
      </div>

      <div className="mt-24 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="order-2 rounded-2xl border border-border bg-surface p-4 shadow-sm lg:order-1">
          <Image
            src="/images/agnet-log.png"
            alt="JobPilot agent activity log"
            width={2144}
            height={1656}
            className="w-full rounded-lg"
          />
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
            Apply With More Confidence, Every Time
          </h2>
          <FeatureList items={confidenceFeatures} />
        </div>
      </div>
    </div>
  );
}
