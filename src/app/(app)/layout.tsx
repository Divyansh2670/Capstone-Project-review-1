import { AppSidebar } from '../../components/layout/app-sidebar';
import { AppHeader } from '../../components/layout/app-header';
import { SidebarProvider } from '../../components/ui/sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
        <AppSidebar />
        <div className="flex min-h-screen flex-col bg-background sm:ml-[4.5rem]">
          <AppHeader />
          <main className="flex flex-1 flex-col p-4 pt-20 md:p-6 md:pt-20 lg:p-8 lg:pt-20">{children}</main>
        </div>
    </SidebarProvider>
  );
}
