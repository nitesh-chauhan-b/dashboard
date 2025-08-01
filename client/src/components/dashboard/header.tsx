import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "@/components/ui/theme-provider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FileText, FileSpreadsheet, Moon, Sun } from "lucide-react";

interface HeaderProps {
  onExportPDF: () => void;
  onExportCSV: () => void;
  onDateRangeChange: (value: string) => void;
}

export function Header({ onExportPDF, onExportCSV, onDateRangeChange }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="bg-card border-b border-border p-6 shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Overview</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your campaigns.
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Date Range Filter */}
          <Select defaultValue="30" onValueChange={onDateRangeChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Export Buttons */}
          <Button onClick={onExportPDF} className="gradient-primary text-white shadow-md">
            <FileText className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          
          <Button variant="outline" onClick={onExportCSV}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          
          {/* Theme Toggle */}
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
          
          {/* User Avatar */}
          <Avatar>
            <AvatarFallback className="gradient-primary text-white font-medium">
              AD
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
