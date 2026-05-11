"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./sidebar";
import { TopBar } from "./topbar";
import { Footer } from "./footer";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col min-h-screen">
        <TopBar />
        <div className="flex-1 overflow-y-auto">
          <div className="flex justify-center px-6 py-8 md:px-10 md:py-10 lg:px-16">
            <div className="w-full max-w-4xl">{children}</div>
          </div>
        </div>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
