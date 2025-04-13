import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Button,
  Avatar,
  Badge,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Link
} from '@heroui/react';
import { Icon } from '@iconify/react';

const navigation = [
  { name: 'Dashboard', href: '/app/dashboard', icon: 'lucide:layout-dashboard' },
  { name: 'My Cameras', href: '/app/cameras', icon: 'lucide:video' },
  { name: 'Event Summaries', href: '/app/events', icon: 'lucide:list' },
  { name: 'Settings', href: '/app/settings', icon: 'lucide:settings' }
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const Index = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const history = useHistory();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  const handleLogout = () => {
    history.push('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile navbar */}
      <Navbar maxWidth="full" className="md:hidden border-b border-divider">
        <NavbarContent justify="start">
          <Button
            isIconOnly
            variant="light"
            onPress={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Icon icon="lucide:menu" className="w-6 h-6" />
          </Button>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Icon icon="lucide:video" className="text-primary" />
            AI Video Insights
          </h2>
        </NavbarContent>
      </Navbar>

      {/* Sidebar - Updated with responsive classes */}
      <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform md:translate-x-0 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full px-3 py-4 overflow-y-auto border-r border-divider bg-content1">
          {/* Close button for mobile */}
          <div className="flex md:hidden justify-end mb-2">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onPress={() => setIsMobileMenuOpen(false)}
            >
              <Icon icon="lucide:x" className="w-5 h-5" />
            </Button>
          </div>

          <div className="mb-6 px-2">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Icon icon="lucide:video" className="text-primary" />
              AI Video Insights
            </h2>
          </div>
          
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-2 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground/80 hover:bg-content2'
                  }`}
                >
                  <Icon icon={item.icon} className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main content - Updated with responsive classes */}
      <div className="md:pl-64">
        {/* Top navbar - Updated for desktop only */}
        <Navbar maxWidth="full" className="hidden md:flex border-b border-divider">
          <NavbarContent justify="end">
            <NavbarItem>
              <Badge content="Pro" color="primary">
                <Button variant="flat">
                  Subscription Active
                </Button>
              </Badge>
            </NavbarItem>
            
            <NavbarItem>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    src="https://img.heroui.chat/image/avatar?w=150&h=150&u=1"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">user@example.com</p>
                  </DropdownItem>
                  <DropdownItem key="settings">My Settings</DropdownItem>
                  <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                  <DropdownItem key="logout" color="danger" onPress={handleLogout}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </NavbarContent>
        </Navbar>

        {/* Main content - Updated padding for mobile */}
        <main className="p-4 md:p-6 pt-16 md:pt-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Index;
