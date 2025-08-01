import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { MetricsCards } from "@/components/dashboard/metrics-cards";
import { ChartsSection } from "@/components/dashboard/charts-section";
import { DataTable } from "@/components/dashboard/data-table";
import { generatePDF } from "@/lib/pdf-generator";
import { exportToCSV } from "@/lib/csv-exporter";
import { mockCampaigns } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // This would normally trigger a refetch of real data
      // For demo purposes, we'll just show a toast occasionally
      if (Math.random() < 0.1) { // 10% chance every 30 seconds
        toast({
          title: "Data Updated",
          description: "Campaign metrics have been refreshed with latest data.",
        });
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [toast]);

  const handleExportPDF = async () => {
    setIsLoading(true);
    try {
      await generatePDF({
        title: "ADmyBRAND Insights - Analytics Report",
        data: mockCampaigns,
        charts: true,
        tables: true,
      });
      toast({
        title: "PDF Generated",
        description: "Your analytics report has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error generating the PDF report.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportCSV = () => {
    try {
      exportToCSV(mockCampaigns, 'admybrand-campaigns.csv');
      toast({
        title: "CSV Exported",
        description: "Campaign data has been exported successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting the CSV file.",
        variant: "destructive",
      });
    }
  };

  const handleDateRangeChange = (value: string) => {
    // This would normally trigger a data refetch with the new date range
    toast({
      title: "Date Range Updated",
      description: `Showing data for the last ${value} days.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="lg:ml-64 min-h-screen">
        <Header
          onExportPDF={handleExportPDF}
          onExportCSV={handleExportCSV}
          onDateRangeChange={handleDateRangeChange}
        />
        
        <main className="p-4 lg:p-6">
          <MetricsCards />
          <ChartsSection />
          <DataTable />
        </main>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-xl p-8 flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-foreground font-medium">Generating PDF Report...</p>
          </div>
        </div>
      )}
    </div>
  );
}
