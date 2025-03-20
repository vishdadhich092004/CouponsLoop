import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { LayoutDashboard, Ticket, History, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { adminLogout } from "@/api.clients";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
const navItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Coupons",
    href: "/admin/coupons",
    icon: Ticket,
  },
  {
    title: "Claim History",
    href: "/admin/claim-history",
    icon: History,
  },
];

export function Sidebar() {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await adminLogout();
    Cookies.remove("auth_token");
    await queryClient.invalidateQueries({ queryKey: ["validate-admin"] });
    navigate("/");
  };

  return (
    <div className="hidden max-h-screen md:flex flex-col w-64 border-r bg-background">
      <div className="p-6">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>
      <div className="flex-1 py-6 px-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === item.href || pathname.startsWith(`${item.href}/`)
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.title}
          </Link>
        ))}
      </div>
      <div className="p-6 border-t">
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
