
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-gray-50/80">
        <AppSidebar />

        <SidebarInset className="flex-1 flex flex-col min-w-0">
          

          {/* Main Content */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
              <SidebarTrigger className="md:hidden" />
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
