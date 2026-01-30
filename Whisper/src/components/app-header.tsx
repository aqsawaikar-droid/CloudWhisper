'use client';

import { Cloud, History, Code2, Settings, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { Avatar, AvatarFallback } from './ui/avatar';
import { cn } from "@/lib/utils";

const navLinks = [
  { href: '/chat', label: 'Chat' },
  { href: '/history', label: 'History' },
  { href: '/workflows', label: 'Workflows' },
];

export function AppHeader() {
  const pathname = usePathname();
  const auth = useAuth();
  const router = useRouter();
  const { user } = useUser();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/');
  };

  const isActive = (path: string) => {
    // Special handling for /chat and /chat/[id]
    if (path === '/chat') {
        return pathname === '/chat' || pathname.startsWith('/chat/');
    }
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            <Cloud className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold">CloudWhisper</span>
        </Link>
        <nav className="hidden items-center justify-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground",
                isActive(link.href) ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-end gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {user?.email ? user.email.charAt(0).toUpperCase() : <User className="h-5 w-5" />}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.displayName || 'User'}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings" className="w-full flex cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
