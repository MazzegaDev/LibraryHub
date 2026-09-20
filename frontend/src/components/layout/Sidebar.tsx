'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BookOpen, 
  LayoutDashboard, 
  Library, 
  Users, 
  ArrowLeftRight,
  Settings,
  Menu
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Livros', href: '/livros', icon: BookOpen },
  { name: 'Autores', href: '/autores', icon: Users },
  { name: 'Empréstimos', href: '/emprestimos', icon: ArrowLeftRight },
  { name: 'Usuários', href: '/usuarios', icon: Library },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-library-wood text-white p-4 z-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-library-gold" />
          <span className="font-serif text-lg font-bold">LibraryHub</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <div className={`
        fixed md:sticky top-0 left-0 h-screen bg-library-wood text-white w-64 flex flex-col z-50
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="bg-library-paper p-2 rounded-md">
            <BookOpen className="w-6 h-6 text-library-wood-dark" />
          </div>
          <span className="font-serif text-xl font-bold tracking-wide">LibraryHub</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-md transition-colors
                  ${isActive 
                    ? 'bg-library-wood-dark border-l-4 border-library-gold text-library-paper' 
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-library-gold' : ''}`} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-md text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Configurações</span>
          </button>
        </div>
      </div>
    </>
  );
}
