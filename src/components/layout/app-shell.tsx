"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./sidebar";
import { TopBar } from "./topbar";
import { Footer } from "./footer";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="min-h-0 flex h-screen flex-col overflow-hidden">
      <TopBar />
      <div className="flex min-h-0 flex-1">
        <AppSidebar />
        <SidebarInset className="overflow-hidden">
          <div className="h-full overflow-y-auto">
            <div className="flex justify-center px-6 py-8 md:px-10 md:py-10 lg:px-16">
              <div className="w-full max-w-4xl">{children}</div>
            </div>
          </div>
        </SidebarInset>
      </div>
      <Footer />
    </SidebarProvider>
  );
}
