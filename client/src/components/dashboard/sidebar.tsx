import { BrandLogo } from "@/components/ui/brand-logo";
import { BrandText } from "@/components/ui/brand-text";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Link, useLocation } from "wouter";
import { 
  ChartLine, 
  ChartBar, 
  Megaphone, 
  ShoppingCart, 
  Package, 
  Menu,
  Moon,
  Sun
} from "lucide-react";
import { useState, useEffect } from "react";

const navigationItems = [
  { icon: ChartLine, label: "Overview", path: "/" },
  { icon: ChartBar, label: "Performance", path: "/performance" },
  { icon: Megaphone, label: "Campaigns", path: "/campaigns" },
  { icon: ShoppingCart, label: "Orders", path: "/orders" },
  { icon: Package, label: "Products", path: "/products" },
];

function SidebarContent() {
  const [location] = useLocation();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial dark mode state
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleDarkMode = () => {
    const newDarkState = !isDark;
    setIsDark(newDarkState);
    
    if (newDarkState) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };
  
  return (
    <div className="p-6 h-full bg-white dark:bg-gray-900">
      {/* Brand Header */}
      <div className="flex items-center mb-8">
        <BrandLogo className="mr-3" />
        <BrandText />
      </div>
      
      {/* Navigation */}
      <nav className="space-y-2">
        <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">
          MAIN MENU
        </div>
        
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          return (
            <Link key={item.label} href={item.path}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start ${
                  isActive 
                    ? "gradient-primary text-white shadow-md" 
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>
      
      {/* Dark Mode Toggle */}
      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {isDark ? (
              <Moon className="mr-2 h-4 w-4 text-gray-600 dark:text-gray-400" />
            ) : (
              <Sun className="mr-2 h-4 w-4 text-gray-600 dark:text-gray-400" />
            )}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </span>
          </div>
          <Switch
            checked={isDark}
            onCheckedChange={toggleDarkMode}
            className="data-[state=checked]:bg-primary"
          />
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 z-50">
        <SidebarContent />
      </div>
      
      {/* Mobile Sidebar - Only visible when needed */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="fixed top-6 left-6 z-50 bg-white dark:bg-gray-900 shadow-lg border-gray-200 dark:border-gray-700"
            >
              <Menu className="h-4 w-4 text-gray-700 dark:text-gray-300" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
