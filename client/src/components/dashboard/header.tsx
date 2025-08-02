import { Button } from "@/components/ui/button";
import { FileText, FileSpreadsheet } from "lucide-react";

interface HeaderProps {
  onExportPDF: () => void;
  onExportCSV: () => void;
}

export function Header({ onExportPDF, onExportCSV }: HeaderProps) {

  return (
    <header className="bg-card border-b border-border p-4 lg:p-6 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
        <div className="lg:pl-0 pl-12">
          <h1 className="text-xl lg:text-2xl font-bold text-foreground">Overview</h1>
          <p className="text-sm lg:text-base text-muted-foreground">
            Welcome back! Here's what's happening with your campaigns.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 lg:space-x-4">
          {/* Export Buttons */}
          <Button onClick={onExportPDF} className="gradient-primary text-white shadow-md">
            <FileText className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          
          <Button variant="outline" onClick={onExportCSV}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>
    </header>
  );
}
