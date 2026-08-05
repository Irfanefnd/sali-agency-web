import Link from "next/link";
import { Mail } from "lucide-react";
import { InstagramIcon, LinkedinIcon } from "@/components/BrandIcons";
import { siteConfig, waLink } from "@/lib/site-config";

const cols = [
  {
    title: "Services",
    links: [
      { href: "/visa-services", label: "Visa Services" },
      { href: "/legal-services", label: "Legal Services" },
      { href: "/other-services", label: "Lifestyle Services" },
      { href: "/legal-services#business-setup", label: "Company Setup" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/#about", label: "About Us" },
      { href: "/articles", label: "Latest Articles" },
      { href: "/admin", label: "Admin Portal" },
    ],
  },
  {
    title: "Contact",
    links: [
      { href: `mailto:${siteConfig.email}`, label: siteConfig.email },
      { href: waLink(), label: "WhatsApp Us" },
      { href: "#", label: siteConfig.address },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "#", label: "Privacy Policy" },
      { href: "#", label: "Terms of Service" },
      { href: "#", label: "Cookie Policy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 bg-bg2 pt-16 pb-10">
      <div className="mx-auto max-w-[1160px] px-8">
        <div className="mb-14 flex flex-col items-start justify-between gap-8 border-b border-bd pb-10 sm:flex-row sm:items-center">
          <div>
            <span className="text-lg font-extrabold text-tx">
              Sali <span className="text-ac">Agency</span>
            </span>
            <p className="mt-2 text-[13px] text-tx2">
              &copy; {new Date().getFullYear()} Sali Agency.
              <br />
              <span className="text-tx3">All rights reserved.</span>
            </p>
          </div>
          <div className="flex gap-3">
            {[
              { icon: InstagramIcon, href: "#", label: "Instagram" },
              { icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email" },
              { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full text-tx2 shadow-neu-sm hover:text-ac"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-[12px] font-bold tracking-wide text-tx3 uppercase">{col.title}</h4>
              <div className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <Link key={l.label} href={l.href} className="text-[13px] text-tx2 hover:text-ac">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
