"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { newspaper, Menu, Plus, Users, Palette } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    {
      href: '/add',
      icon: Plus,
      label: 'Add New',
    },
    {
      href: '/profiles',
      icon: Users,
      label: 'Profiles',
    },
    {
      href: '/design',
      icon: Palette,
      label: 'Design',
    },
  ];

  const SidebarContent = (
    <ScrollArea className="flex h-full flex-col items-start py-4">
      <div className="flex items-center pl-4 mb-10">
        <newspaper className="h-8 w-8" />
        <h1 className="text-2xl font-bold ml-2">CV Builder</h1>
      </div>
      <div className="space-y-2 w-full">
        {routes.map((route) => (
          <Link key={route.href} href={route.href} passHref>
            <Button
              variant={pathname === route.href ? 'secondary' : 'ghost'}
              className={cn('w-full justify-start', {
                'bg-muted': pathname === route.href,
              })}
            >
              <route.icon className="mr-2 h-5 w-5" />
              {route.label}
            </Button>
          </Link>
        ))}
      </div>
    </ScrollArea>
  );

  return (
    <>
      <aside className="hidden md:flex md:w-64 md:flex-col">
        {SidebarContent}
      </aside>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="md:hidden fixed top-4 left-4">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          {SidebarContent}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidebar;