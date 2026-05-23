'use client';

import { useTheme } from '@/hooks/use-theme';
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
import Button from '@/components/ui/button';

const navItems = [
  { href: '/app', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/app/pricing', label: 'Pricing', icon: Sparkles },
  { href: '/app/billing', label: 'BBilling', icon: CreditCard },
];

export default function DashboardLayout() {
  const { theme, toggle } = useTheme();
  return (
    <div className='px-2'>
      <nav className='flex justify-between'>
        <div className='flex'>
          <div>
            <Activity className='w-5 h-5 text-primary-foreground' />
          </div>
          <div>
            <span>Planly</span>
            <br />
            <span>Learning coach</span>
          </div>
        </div>
        <div className='flex gap-4'>
          <Button
            variant='ghost'
            size='icon'
            onClick={toggle}
            aria-label='Toggle theme'
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </Button>
          <Button
            variant='ghost'
            size='icon'
            onClick={toggle}
            aria-label='Sign out'
          >
            <LogOut className='w-4 h-4' />
          </Button>
        </div>
      </nav>
    </div>
  );
}
