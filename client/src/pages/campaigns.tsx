import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { DataTable } from "@/components/dashboard/data-table";
import { DateRangeFilter } from "@/components/campaigns/date-range-filter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit2, Trash2, Calendar, TrendingUp, DollarSign, Target, Users } from "lucide-react";
import { CampaignModal } from "@/components/modals/campaign-modal";
import { initializeStorage, loadCampaigns, saveCampaigns } from "@/lib/local-storage";
import type { Campaign } from "@/lib/local-storage";
import { isWithinInterval, parseISO } from "date-fns";
import { DateRange } from "react-day-picker";
import { dynamicData } from "@/lib/dynamic-data";

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('view');
  const [metrics, setMetrics] = useState(dynamicData.getCurrentMetrics());

  // Initialize and load data
  useEffect(() => {
    initializeStorage();
    const loadedCampaigns = loadCampaigns();
    setCampaigns(loadedCampaigns);
    setFilteredCampaigns(loadedCampaigns);
  }, []);

  // Update metrics every 5 seconds for dynamic display
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(dynamicData.getCurrentMetrics());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Filter campaigns based on search, status, platform and date range
  useEffect(() => {
    let filtered = campaigns;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(campaign =>
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.platform.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(campaign => campaign.status === statusFilter);
    }

    // Platform filter
    if (platformFilter !== "all") {
      filtered = filtered.filter(campaign => campaign.platform === platformFilter);
    }

    // Date range filter
    if (dateRange?.from && dateRange?.to) {
      filtered = filtered.filter(campaign => {
        const campaignDate = new Date(campaign.createdAt);
        return isWithinInterval(campaignDate, {
          start: dateRange.from!,
          end: dateRange.to!
        });
      });
    }

    setFilteredCampaigns(filtered);
  }, [campaigns, searchTerm, statusFilter, platformFilter, dateRange]);

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