import Image from "next/image";
import Link from "next/link";

// 3. Type definitions
const footerLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Condition", href: "/terms" },
];

// 4. Component
export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-surface">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <Image
          src="/logo.png"
          alt="JobPilot"
          width={496}
          height={168}
          className="h-7 w-auto"
        />

        <nav className="flex items-center gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-secondary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
