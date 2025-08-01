import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { DataTable } from "@/components/dashboard/data-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar, Filter } from "lucide-react";

export default function Campaigns() {
  const [dateRange, setDateRange] = useState("30");

  const handleDateRangeChange = (value: string) => {
    setDateRange(value);
    // This would filter the campaigns based on date range
    console.log(`Filtering campaigns for last ${value} days`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="lg:ml-64 min-h-screen">
        <header className="bg-card border-b border-border p-4 lg:p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
            <div className="lg:pl-0 pl-12">
              <h1 className="text-xl lg:text-2xl font-bold text-foreground">Campaigns</h1>
              <p className="text-sm lg:text-base text-muted-foreground">
                Manage and monitor all your advertising campaigns with full CRUD functionality.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Select value={dateRange} onValueChange={handleDateRangeChange}>
                <SelectTrigger className="w-40">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="365">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>
        </header>
        
        <main className="p-6">
          <DataTable dateFilter={dateRange} />
        </main>
      </div>
    </div>
  );
}