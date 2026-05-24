"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Moon,
  Sun,
  Activity,
  LogOut,
  CreditCard,
  Crown,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/util';
import Button from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/hooks/use-theme';
import { useAuth } from '@/hooks/use-auth';
import { useSubscription } from '@/hooks/use-subscription';

const navItems = [
  { href: '/app', label: 'Dashboard', exact: true },
  { href: '/app/pricing', label: 'Pricing', exact: false },
  { href: '/app/billing', label: 'Billing', exact: false },
];

const navIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  '/app': LayoutDashboard,
  '/app/pricing': Sparkles,
  '/app/billing': CreditCard,
};

const todayLabel = () =>
  new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const { user, signOut } = useAuth();
  const { tier } = useSubscription();

  const displayName =
    (user?.user_metadata?.display_name as string | undefined) ??
    (user?.user_metadata?.full_name as string | undefined) ??
    user?.email?.split('@')[0] ??
    '';

  // Helper to determine if a link is active in Next.js
  const isLinkActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <div className='flex min-h-screen'>
        {/* Sidebar */}
        <aside className='hidden w-60 shrink-0 border-r border-sidebar-border bg-sidebar md:flex md:flex-col'>
          <div className='flex h-16 items-center gap-2 border-b border-sidebar-border px-5'>
            <div className='grid h-9 w-9 place-items-center rounded-lg gradient-primary shadow-elegant'>
              <Activity className='h-5 w-5 text-primary-foreground' />
            </div>
            <div className='flex flex-col leading-tight'>
              <span className='text-sm font-semibold'>Planly</span>
              <span className='text-xs text-muted-foreground'>
                Learning coach
              </span>
            </div>
          </div>
          <nav className='flex-1 space-y-1 p-3'>
            {navItems.map((item) => {
              const Icon = navIcons[item.href];
              const isActive = isLinkActive(item.href, item.exact);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground',
                  )}
                >
                  {Icon && <Icon className='h-4 w-4' />}
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className='space-y-2 border-t border-sidebar-border p-3 text-xs text-muted-foreground'>
            <div className='flex items-center justify-between'>
              <span className='truncate'>{user?.email ?? ''}</span>
              <Badge
                variant={tier === 'free' ? 'secondary' : 'default'}
                className='capitalize text-[10px]'
              >
                {tier === 'premium' && <Crown className='mr-1 h-2.5 w-2.5' />}
                {tier}
              </Badge>
            </div>
          </div>
        </aside>

        {/* Main Workspace */}
        <div className='flex min-w-0 flex-1 flex-col'>
          <header className='sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur md:px-8'>
            <div className='flex items-center gap-3'>
              <div className='grid h-9 w-9 place-items-center rounded-lg gradient-primary md:hidden'>
                <Activity className='h-5 w-5 text-primary-foreground' />
              </div>
              <div>
                <h1 className='text-base font-semibold leading-tight'>
                  Planly
                </h1>
                {/* <p className='text-xs text-muted-foreground'>{todayLabel()}</p> */}
              </div>
            </div>
            <div className='flex items-center gap-1'>
              {displayName && (
                <span className='hidden text-xs text-muted-foreground sm:inline mr-1'>
                  {displayName}
                </span>
              )}
              <Button
                variant='ghost'
                size='icon'
                onClick={toggle}
                aria-label='Toggle theme'
              >
                {theme === 'dark' ? (
                  <Sun className='h-4 w-4' />
                ) : (
                  <Moon className='h-4 w-4' />
                )}
              </Button>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => signOut()}
                aria-label='Sign out'
              >
                <LogOut className='h-4 w-4' />
              </Button>
            </div>
          </header>

          <main className='flex-1 px-4 py-6 md:px-8 md:py-8'>
            {children}
          </main>

          {/* Bottom Mobile Navigation */}
          <nav className='sticky bottom-0 z-20 flex justify-around border-t bg-background/95 py-2 backdrop-blur md:hidden'>
            {navItems.map((item) => {
              const Icon = navIcons[item.href];
              const isActive = isLinkActive(item.href, item.exact);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex flex-col items-center gap-1 rounded-md px-4 py-1 text-xs',
                    isActive ? 'text-primary' : 'text-muted-foreground',
                  )}
                >
                  {Icon && <Icon className='h-5 w-5' />}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}