import { BrandLogo } from "@/components/ui/brand-logo";
import { BrandText } from "@/components/ui/brand-text";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "wouter";
import { 
  ChartLine, 
  ChartBar, 
  Megaphone, 
  ShoppingCart, 
  Package, 
  Mail, 
  Beaker,
  Menu
} from "lucide-react";
import { useState } from "react";

const navigationItems = [
  { icon: ChartLine, label: "Overview", path: "/" },
  { icon: ChartBar, label: "Performance", path: "/performance" },
  { icon: Megaphone, label: "Campaigns", path: "/campaigns" },
  { icon: ShoppingCart, label: "Orders", path: "/orders" },
  { icon: Package, label: "Products", path: "/products" },
  { icon: Mail, label: "Messages", path: "/messages" },
];

function SidebarContent() {
  const [location] = useLocation();
  
  return (
    <div className="p-6">
      {/* Brand Header */}
      <div className="flex items-center mb-8">
        <BrandLogo className="mr-3" />
        <BrandText />
      </div>
      
      {/* Navigation */}
      <nav className="space-y-2">
        <div className="text-xs font-semibold text-muted-foreground dark:text-muted-foreground uppercase tracking-wider mb-4">
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
                    : "hover:bg-sidebar-accent dark:hover:bg-sidebar-accent text-sidebar-foreground dark:text-sidebar-foreground"
                }`}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>
      
      {/* Demo Mode Card */}
      <div className="mt-8 p-4 gradient-primary rounded-lg text-white">
        <div className="flex items-center mb-2">
          <Beaker className="mr-2 h-4 w-4" />
          <span className="text-sm font-medium">Demo Mode</span>
        </div>
        <p className="text-xs opacity-90 mb-3">
          Get detailed analytics for help you upgrade pro
        </p>
        <Button
          variant="secondary"
          size="sm"
          className="w-full bg-white/20 hover:bg-white/30 text-white border-0"
        >
          Upgrade Now
        </Button>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-sidebar-background dark:bg-sidebar-background border-r border-sidebar-border dark:border-sidebar-border shadow-lg z-50">
        <SidebarContent />
      </div>
      
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed top-4 left-4 z-50 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 bg-sidebar-background dark:bg-sidebar-background">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
