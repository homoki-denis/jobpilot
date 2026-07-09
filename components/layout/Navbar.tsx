import Image from "next/image";
import Link from "next/link";

// 2. Internal imports
import { buttonVariants } from "@/components/ui/button";

// 3. Type definitions
const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Find Jobs", href: "/find-jobs" },
  { label: "Profile", href: "/profile" },
];

// 4. Component
export function Navbar() {
  return (
    <header className="w-full bg-surface">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="JobPilot"
            width={496}
            height={168}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-text-dark"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/login" className={buttonVariants("dark")}>
          Start for free
        </Link>
      </div>
    </header>
  );
}
