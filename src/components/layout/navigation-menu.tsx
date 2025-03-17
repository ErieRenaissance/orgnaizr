'use client';

import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home,
  MapPin,
  Box,
  Plus,
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';

export function NavigationMenu() {
  const location = useLocation();
  const { signOut } = useAuth();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: MapPin, label: 'Locations', path: '/locations' },
    { icon: Box, label: 'Containers', path: '/containers' },
    { icon: Plus, label: 'Add New', path: '/add' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t md:relative md:border-t-0 md:border-r md:w-64 md:min-h-screen">
      <div className="flex md:flex-col p-2 md:p-4 gap-1 md:gap-2">
        {menuItems.map((item) => (
          <Button
            key={item.path}
            variant={location.pathname === item.path ? 'default' : 'ghost'}
            className={cn(
              'flex-1 md:flex-none justify-start',
              location.pathname === item.path && 'bg-accent'
            )}
            asChild
          >
            <Link to={item.path}>
              <item.icon className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          </Button>
        ))}
        
        <Button
          variant="ghost"
          className="flex-1 md:flex-none justify-start text-destructive"
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span className="hidden md:inline">Sign Out</span>
        </Button>
      </div>
    </nav>
  );
}