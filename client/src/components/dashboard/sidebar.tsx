import { BrandLogo } from "@/components/ui/brand-logo";
import { BrandText } from "@/components/ui/brand-text";
import { Button } from "@/components/ui/button";
import { 
  ChartLine, 
  ChartBar, 
  Megaphone, 
  ShoppingCart, 
  Package, 
  Mail, 
  Beaker 
} from "lucide-react";

const navigationItems = [
  { icon: ChartLine, label: "Overview", active: true },
  { icon: ChartBar, label: "Performance", active: false },
  { icon: Megaphone, label: "Campaigns", active: false },
  { icon: ShoppingCart, label: "Orders", active: false },
  { icon: Package, label: "Products", active: false },
  { icon: Mail, label: "Messages", active: false },
];

export function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-sidebar-background border-r border-sidebar-border shadow-lg z-50">
      <div className="p-6">
        {/* Brand Header */}
        <div className="flex items-center mb-8">
          <BrandLogo className="mr-3" />
          <BrandText />
        </div>
        
        {/* Navigation */}
        <nav className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            MAIN MENU
          </div>
          
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.label}
                variant={item.active ? "default" : "ghost"}
                className={`w-full justify-start ${
                  item.active 
                    ? "gradient-primary text-white shadow-md" 
                    : "hover:bg-sidebar-accent"
                }`}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
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
    </div>
  );
}
