import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, Users, UserRound, Briefcase, Newspaper, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/lib/actions/auth";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/clients", label: "Clients", icon: UserRound },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/articles", label: "Articles", icon: Newspaper },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-bg">
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-bd bg-bg p-5 lg:flex">
        <div className="mb-8">
          <div className="text-[17px] font-extrabold text-tx">
            Sali <b className="text-ac">Agency</b>
          </div>
          <small className="text-[10.5px] text-tx3">Admin Console</small>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium text-tx2 hover:text-ac"
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-bd pt-4">
          <div className="mb-3 truncate text-[12px] text-tx3">{user.email}</div>
          <form action={logout}>
            <button type="submit" className="flex items-center gap-2 text-[13px] font-medium text-tx2 hover:text-red-500">
              <LogOut size={15} /> Sign out
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-6 lg:ml-60 lg:p-10">{children}</main>
    </div>
  );
}
