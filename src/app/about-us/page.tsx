'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { PageHeader } from '../../components/page-header';
import { Logo } from '../../components/logo';
import { Button } from '../../components/ui/button';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '../../components/ui/sheet';
import { Menu } from 'lucide-react';

const teamMembers = [
  {
    name: 'Divyansh Sharma',
    role: 'Project Lead & Full-Stack Developer',
    avatarUrl: 'https://i.pravatar.cc/150?u=divyansh',
    fallback: 'DS',
  },
  {
    name: 'Anusha',
    role: 'Frontend & UI/UX Specialist',
    avatarUrl: 'https://storage.googleapis.com/project-spark-b2c6a.appspot.com/users%2FAg6sAlhJ0XWf2L5uD1aQxT5p37A2%2Fuploads%2B1733676751020%2FAnusha.png',
    fallback: 'A',
  },
  {
    name: 'Rutvik',
    role: 'Backend & Database Architect',
    avatarUrl: 'https://i.pravatar.cc/150?u=rutvik',
    fallback: 'R',
  },
  {
    name: 'Mukund Rao',
    role: 'DevOps & Cloud Infrastructure',
    avatarUrl: 'https://i.pravatar.cc/150?u=mukund',
    fallback: 'MR',
  },
];

export default function AboutUsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-muted">
       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Logo href="/" />
          <nav className="hidden items-center gap-4 md:flex">
            <Button variant="ghost" asChild>
                <Link href="/about-us">About Us</Link>
            </Button>
            <Button variant="ghost" asChild>
                <Link href="/#pricing">Pricing</Link>
            </Button>
            <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                <Link href="/register">Get Started</Link>
                </Button>
            </div>
          </nav>
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium mt-8">
                 <Link href="/about-us" className="hover:text-foreground">About Us</Link>
                 <Link href="/#pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link>
                 <Link href="/login" className="text-muted-foreground hover:text-foreground">Login</Link>
                 <Link href="/register" className="text-muted-foreground hover:text-foreground">Get Started</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-20 md:py-24">
          <PageHeader
            title="Meet the Team"
            description="The minds behind ClientCraft CRM. We are passionate about creating simple, effective solutions."
          />
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map(member => (
              <Card key={member.name} className="text-center">
                <CardHeader className="items-center">
                  <Avatar className="h-24 w-24 border">
                    <AvatarImage src={member.avatarUrl} alt={member.name} />
                    <AvatarFallback>{member.fallback}</AvatarFallback>
                  </Avatar>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <p className="text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t bg-background py-6">
        <div className="container flex items-center justify-between">
          <Logo href="/" />
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} ClientCraft CRM. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
