import { label } from 'framer-motion/client';
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
  return (
    <div>
      <nav>
        <div>
          <div>
            <Activity size={16} />
          </div>
          <div>
            <span>Planly</span>
            <span>Learning coach</span>
          </div>
        </div>
        <div className='flex gap-4'>
          
        </div>
      </nav>
    </div>
  );
}
