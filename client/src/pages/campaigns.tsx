import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { DateRangeFilter } from "@/components/campaigns/date-range-filter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit2, Trash2, Calendar, TrendingUp, DollarSign, Target, Users } from "lucide-react";
import { CampaignModal } from "@/components/modals/campaign-modal";
import { mockCampaigns } from "@/lib/mock-data";
import type { Campaign } from "@shared/schema";
import { isWithinInterval } from "date-fns";
import { DateRange } from "react-day-picker";
import { dynamicData } from "@/lib/dynamic-data";

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('view');
  const [metrics, setMetrics] = useState(dynamicData.getCurrentMetrics());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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

    // Date range filter using campaign start date
    if (dateRange?.from && dateRange?.to) {
      filtered = filtered.filter(campaign => {
        const campaignStartDate = campaign.startDate ? new Date(campaign.startDate) : (campaign.createdAt ? new Date(campaign.createdAt) : new Date());
        return isWithinInterval(campaignStartDate, {
          start: dateRange.from!,
          end: dateRange.to!
        });
      });
    }

    setFilteredCampaigns(filtered);
  }, [campaigns, searchTerm, statusFilter, platformFilter, dateRange]);

  const handleCreateCampaign = () => {
    setSelectedCampaign(null);
    setModalMode('create');
    setModalOpen(true);
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setModalMode('edit');
    setModalOpen(true);
  };

  const handleViewCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setModalMode('view');
    setModalOpen(true);
  };

  const handleSaveCampaign = (campaignData: any) => {
    let updatedCampaigns;
    
    if (modalMode === 'create') {
      const newCampaign = {
        ...campaignData,
        id: Date.now().toString(),
        startDate: campaignData.startDate || new Date(),
        endDate: campaignData.endDate || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      updatedCampaigns = [...campaigns, newCampaign];
    } else {
      updatedCampaigns = campaigns.map(c => 
        c.id === campaignData.id ? { ...c, ...campaignData, updatedAt: new Date() } : c
      );
    }
    
    setCampaigns(updatedCampaigns);
  };

  const handleDeleteCampaign = (campaignId: string) => {
    const updatedCampaigns = campaigns.filter(c => c.id !== campaignId);
    setCampaigns(updatedCampaigns);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'paused': return 'secondary';
      case 'completed': return 'outline';
      default: return 'destructive';
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCampaigns = filteredCampaigns.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, platformFilter, dateRange]);

  const calculateMetrics = () => {
    const totalBudget = filteredCampaigns.reduce((sum, c) => sum + parseFloat(c.budget), 0);
    const totalSpent = filteredCampaigns.reduce((sum, c) => sum + parseFloat(c.spent), 0);
    const totalConversions = filteredCampaigns.reduce((sum, c) => sum + c.conversions, 0);
    const avgCTR = filteredCampaigns.length > 0 
      ? filteredCampaigns.reduce((sum, c) => sum + parseFloat(c.ctr), 0) / filteredCampaigns.length 
      : 0;

    return { totalBudget, totalSpent, totalConversions, avgCTR };
  };

  const campaignMetrics = calculateMetrics();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="lg:ml-64 min-h-screen">
        <header className="bg-card border-b border-border p-4 lg:p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
            <div className="lg:pl-0 pl-12">
              <h1 className="text-xl lg:text-2xl font-bold text-foreground">Campaigns</h1>
              <p className="text-sm lg:text-base text-muted-foreground">
                Manage and monitor all your advertising campaigns with advanced date filtering.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <DateRangeFilter 
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
              />
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-6 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${campaignMetrics.totalBudget.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Across {filteredCampaigns.length} campaigns
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${campaignMetrics.totalSpent.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {((campaignMetrics.totalSpent / campaignMetrics.totalBudget) * 100).toFixed(1)}% of budget
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Conversions</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{campaignMetrics.totalConversions.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  From active campaigns
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average CTR</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{campaignMetrics.avgCTR.toFixed(2)}%</div>
                <p className="text-xs text-muted-foreground">
                  Campaign average
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Campaigns Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Campaign Performance</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Track and manage your advertising campaigns with advanced filtering
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search campaigns..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={platformFilter} onValueChange={setPlatformFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Platforms</SelectItem>
                      <SelectItem value="Google Ads">Google Ads</SelectItem>
                      <SelectItem value="Facebook">Facebook</SelectItem>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="Twitter">Twitter</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                      <SelectItem value="TikTok">TikTok</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={handleCreateCampaign}
                    className="gradient-primary text-white"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Campaign
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Platform</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Spent</TableHead>
                      <TableHead>Conversions</TableHead>
                      <TableHead>CTR</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedCampaigns.map((campaign) => (
                      <TableRow key={campaign.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="font-medium">{campaign.name}</div>
                          <div className="text-sm text-muted-foreground">{campaign.id}</div>
                        </TableCell>
                        <TableCell>{campaign.platform}</TableCell>
                        <TableCell className="font-medium">${parseFloat(campaign.budget).toLocaleString()}</TableCell>
                        <TableCell className="font-medium">${parseFloat(campaign.spent).toLocaleString()}</TableCell>
                        <TableCell>{campaign.conversions}</TableCell>
                        <TableCell>{campaign.ctr}%</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(campaign.status)}>
                            <span className={campaign.status === 'completed' ? "text-foreground dark:text-foreground" : "text-white"}>
                              {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                            </span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {campaign.startDate ? new Date(campaign.startDate).toLocaleDateString() : (campaign.createdAt ? new Date(campaign.createdAt).toLocaleDateString() : 'N/A')}
                        </TableCell>
                        <TableCell>
                          {campaign.endDate ? new Date(campaign.endDate).toLocaleDateString() : 'Ongoing'}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleEditCampaign(campaign)}
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                              onClick={() => handleDeleteCampaign(campaign.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {filteredCampaigns.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">No campaigns found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-2 py-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredCampaigns.length)} of {filteredCampaigns.length} campaigns
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          className="w-8 h-8 p-0"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Campaign Modal */}
          <CampaignModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            campaign={selectedCampaign}
            mode={modalMode}
            onSave={handleSaveCampaign}
            onDelete={handleDeleteCampaign}
          />
        </main>
      </div>
    </div>
  );
}