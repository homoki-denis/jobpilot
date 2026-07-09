import Image from "next/image";

// 4. Component
export function Testimonial() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <span className="text-xs font-semibold tracking-wide text-accent uppercase">
          Success Stories
        </span>

        <p className="mt-4 text-xl font-medium text-text-primary sm:text-2xl">
          &ldquo;I used to spend my evenings copy-pasting resumes. Now I open
          my dashboard to see interviews waiting. It feels like cheating. Had
          3 offers on the table simultaneously.&rdquo;
        </p>

        <div className="mt-6 flex items-center gap-3">
          <Image
            src="/images/user-icon.png"
            alt="Tom Wilson"
            width={192}
            height={192}
            className="size-10 rounded-full object-cover"
          />
          <div className="text-left">
            <p className="text-sm font-semibold text-text-primary">
              Tom Wilson
            </p>
            <p className="text-xs text-text-muted">Junior Developer</p>
          </div>
        </div>
      </div>
    </section>
  );
}
