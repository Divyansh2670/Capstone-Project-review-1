import { Sun } from 'lucide-react';
import { cn } from '../lib/utils';
import Link from 'next/link';

export function Logo({
  className,
  href = '/dashboard',
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-2 text-foreground transition-opacity hover:opacity-80',
        className
      )}
    >
      <div className="rounded-lg bg-primary p-1.5">
        <Sun className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold">ClientCraft</span>
    </Link>
  );
}
