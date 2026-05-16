import { Activity, LayoutDashboard, Sparkles, CreditCard } from 'lucide-react';
import  Link  from 'next/link';

const navItems = [
  { href: '/app', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/app/pricing', label: 'Pricing', icon: Sparkles },
  { href: '/app/billing', label: 'Billing', icon: CreditCard },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <div>
          <aside>
            <div>
              <div>
                <Activity className='h-5 w-5' />
              </div>
              <div>
                <span>Planly</span>
                <span>Learning coach</span>
              </div>
            </div>
            <nav>
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <item.icon />
                  {item.label}
                </Link>
              ))}
            </nav>
            <div>
              <div>
                <span></span>
              </div>
            </div>
          </aside>

          {children}
        </div>
      </body>
    </html>
  );
}
