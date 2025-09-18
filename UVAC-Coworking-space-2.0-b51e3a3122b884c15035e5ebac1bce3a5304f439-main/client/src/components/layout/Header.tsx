import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, X, User2, Bell, Home, User, Calendar, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export const Header = () => {
  const { user, loading, checkAuth, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Only check auth if we have a token and user is null
  useEffect(() => {
    if (mounted && loading) {
      const storedToken = localStorage.getItem('token');
      if (storedToken && !user) {
        checkAuth();
      }
    }
  }, [mounted, loading, checkAuth, user]);

  const handleLogout = async () => {
    try {
      await logout();
      setLocation('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!mounted) return null;

  interface NavItem {
    name: string;
    path: string;
    onClick?: () => Promise<void>;
  }

  const navItems: NavItem[] = user ? [
   
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Dashboard", path: "/dashboard" },
  ] : [
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-center">
            <div className="flex items-center">
              <span className="text-primary font-bold text-2xl">UVAC</span>
              <span className="text-[#FF6B35] font-medium ml-1">Co-working space</span>
            </div>
            <p className="text-sm text-[#FF6B35] mt-1">A unit by UVAC technologies private limited</p>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((service) => (
              service.name === "Services" ? (
                <DropdownMenu key="services-dropdown">
                  <DropdownMenuTrigger asChild>
                    <Link href={service.path} className="text-base font-medium text-neutral-700 hover:text-primary flex items-center gap-2">
                      {service.name}
                      <ChevronDown className="h-4 w-4" />
                    </Link>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64">
                    <DropdownMenuLabel>Office Solutions</DropdownMenuLabel>
                    <DropdownMenuSeparator key="separator-1" />
                    <DropdownMenuItem key="private-offices">
                      <Link href="/services/private-offices" className="w-full flex justify-start">
                        Private Offices
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem key="office-space">
                      <Link href="/services/office-space" className="w-full flex justify-start">
                        Office Space
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem key="dedicated-desk">
                      <Link href="/services/dedicated-desk" className="w-full flex justify-start">
                        Dedicated Desk
                      </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator key="separator-2" />
                    <DropdownMenuLabel>Flexible Workspaces</DropdownMenuLabel>
                    <DropdownMenuItem key="coworking">
                      <Link href="/services/coworking" className="w-full flex justify-start">
                        Coworking Space
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem key="hot-desking">
                      <Link href="/services/hot-desking" className="w-full flex justify-start">
                        Hot Desking
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem key="meeting-rooms">
                      <Link href="/services/meeting-rooms" className="w-full flex justify-start">
                        Meeting Rooms
                      </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator key="separator-3" />
                    <DropdownMenuLabel>Virtual Solutions</DropdownMenuLabel>
                    <DropdownMenuItem key="virtual-offices">
                      <Link href="/services/virtual-offices" className="w-full flex justify-start">
                        Virtual Offices
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem key="business-address">
                      <Link href="/services/business-address" className="w-full flex justify-start">
                        Business Address
                      </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator key="separator-4" />
                    <DropdownMenuLabel>Support Services</DropdownMenuLabel>
                    <DropdownMenuItem key="telephone-answering">
                      <Link href="/services/telephone-answering" className="w-full flex justify-start">
                        Telephone Answering
                      </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator key="separator-5" />
                    <DropdownMenuItem key="membership">
                      <Link href="/services/membership" className="w-full flex justify-start">
                        Membership Plans
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link key={service.path} href={service.path} className="text-base font-medium text-neutral-700 hover:text-primary">
                  {service.name}
                </Link>
              )
            ))}
          </nav>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                {user?.profile_image ? (
                  <img src={user.profile_image} alt={user?.firstName} className="h-8 w-8 rounded-full object-cover border-2" />
                ) : (
                  <User2 className="w-8 h-8 text-neutral-700" />
                )}
                <span className="text-base font-medium text-neutral-700">
                  {user?.firstName || user?.username || 'User'}
                </span>
                <button onClick={handleLogout} className="text-sm text-primary hover:text-primary/80">
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm">
                  Login
                </Link>
                <Link to="/register" className="text-sm">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-neutral-700 hover:text-primary"
            aria-label="Main menu"
            aria-expanded={false}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((service) => (
              <Link key={service.path} href={service.path} className="block px-3 py-2 text-base text-neutral-700 hover:bg-blue-50 hover:text-primary rounded-md">
                {service.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
