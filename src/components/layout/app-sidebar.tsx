import { Logo } from '../logo';
import { AppNav } from './app-nav';

export function AppSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden h-full w-[4.5rem] flex-col border-r bg-sidebar text-sidebar-foreground sm:flex">
      <div className="flex h-16 items-center justify-center border-b">
        <Logo className="[&>span]:hidden" />
      </div>
      <AppNav />
    </aside>
  );
}
