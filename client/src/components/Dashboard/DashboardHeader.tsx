import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { ModeToggle } from "@/components/mode-toggle";

export function DashboardHeader() {
  const [open, setOpen] = useState(false);
  const { admin } = useAdminAuth();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>
      <div className="ml-auto flex items-center gap-4">
        <ModeToggle />
        <div className="flex items-center gap-2">
          <div>
            <p className="text-sm font-medium">{admin?.username}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
