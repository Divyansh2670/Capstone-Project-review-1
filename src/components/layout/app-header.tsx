'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Menu, User, LogOut, Settings, Star, Building } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { AppNav } from './app-nav';
import { Logo } from '../logo';
import Link from 'next/link';
import { useScrollDirection } from '../../hooks/use-scroll-direction';
import { cn } from '../../lib/utils';

export function AppHeader() {
  const scrollDirection = useScrollDirection();

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-30 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm transition-transform duration-300 sm:left-[4.5rem] sm:px-6',
        scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
      )}
    >
      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-0">
            <div className="flex h-full flex-col">
              <div className="border-b p-4">
                <Logo />
              </div>
              <AppNav isMobile={true} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden sm:block">
        {/* Placeholder for breadcrumbs or page title */}
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 sm:flex">
          <Button variant="ghost" asChild>
            <Link href="/about-us">About Us</Link>
          </Button>
          <Button asChild>
            <Link href="/#pricing">
              <Star className="mr-2 h-4 w-4" />
              Upgrade to Pro
            </Link>
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src="https://i.pravatar.cc/150?u=admin_user"
                  alt="User"
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Admin</p>
                <p className="text-xs leading-none text-muted-foreground">
                  admin@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="sm:hidden">
               <DropdownMenuItem asChild>
                <Link href="/about-us">
                  <Building className="mr-2 h-4 w-4" />
                  <span>About Us</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/#pricing">
                  <Star className="mr-2 h-4 w-4" />
                  <span>Upgrade to Pro</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </div>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
