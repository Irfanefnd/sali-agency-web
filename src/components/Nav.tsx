import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";

const links = [
  { href: "/visa-services", label: "Visa Services" },
  { href: "/legal-services", label: "Legal Services" },
  { href: "/other-services", label: "Other Services" },
  { href: "/articles", label: "Article" },
  { href: "/ai-chat", label: "AI Chat" },
];

export function Nav() {
  return (
    <header className="fixed top-4 left-1/2 z-50 h-[60px] w-[calc(100%-48px)] max-w-[1140px] -translate-x-1/2 rounded-full border border-white/50 bg-bg shadow-neu-lg dark:border-white/5">
      <nav className="mx-auto flex h-full items-center justify-between px-5">
        <Link href="/" className="flex items-center">
          <span className="text-lg font-extrabold tracking-tight text-tx">
            Sali <span className="text-ac">Agency</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="rounded-full px-3 py-2 text-[13px] font-semibold text-tx2 shadow-neu-sm transition-colors hover:text-ac"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <MobileNav links={links} />
        </div>
      </nav>
    </header>
  );
}
