import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Dumbbell, ArrowLeft, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

interface NavbarProps {
  items: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-bold">HealthTrack</span>
          </div>
          <button
            onClick={toggleMenu}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Navigation */}
      <nav
        className={cn(
          "fixed lg:sticky top-0 left-0 h-full bg-white border-r border-gray-200 p-4 z-50 transition-transform duration-300 w-64",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="hidden lg:flex items-center gap-2 mb-8">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Welcome
            </Button>
          </div>
          <div className="hidden lg:flex items-center gap-2 mb-8">
            <Dumbbell className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">HealthTrack</span>
          </div>
          <div className="space-y-2 mt-16 lg:mt-0">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-4 py-2 rounded-md transition-colors',
                      {
                        'bg-blue-50 text-blue-600': isActive,
                        'text-gray-600 hover:bg-gray-100': !isActive,
                      }
                    )
                  }
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
          <div className="mt-auto lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              className="w-full gap-2"
              onClick={() => {
                setIsOpen(false);
                navigate('/');
              }}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Welcome
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;