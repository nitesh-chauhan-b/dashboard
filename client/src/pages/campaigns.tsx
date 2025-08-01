import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Filter, Plus, Search } from "lucide-react";
import { format } from "date-fns";
import { mockCampaigns } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function Campaigns() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{from?: Date; to?: Date}>({});
  const [showFilters, setShowFilters] = useState(false);

  const filteredCampaigns = mockCampaigns.filter((campaign) => {
    const matchesSearch = 
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.platform.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
    const matchesPlatform = platformFilter === "all" || campaign.platform === platformFilter;
    
    const matchesDateRange = !dateRange.from || 
      (dateRange.from && dateRange.to 
        ? (campaign.createdAt >= dateRange.from && campaign.createdAt <= dateRange.to)
        : campaign.createdAt >= dateRange.from
      );
    
    return matchesSearch && matchesStatus && matchesPlatform && matchesDateRange;
  });

  const platforms = [...new Set(mockCampaigns.map(c => c.platform))];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="lg:ml-64 min-h-screen">
        <header className="bg-card border-b border-border p-4 lg:p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
            <div className="lg:pl-0 pl-12">
              <h1 className="text-xl lg:text-2xl font-bold text-foreground">Campaigns</h1>
              <p className="text-sm lg:text-base text-muted-foreground">
                Manage and monitor all your advertising campaigns.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button onClick={() => setShowFilters(!showFilters)} variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filters
                {(statusFilter !== "all" || platformFilter !== "all" || dateRange.from) && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                    {[statusFilter !== "all", platformFilter !== "all", dateRange.from].filter(Boolean).length}
                  </span>
                )}
              </Button>
              {(statusFilter !== "all" || platformFilter !== "all" || dateRange.from) && (
                <Button 
                  onClick={() => {
                    setStatusFilter("all");
                    setPlatformFilter("all");
                    setDateRange({});
                  }} 
                  variant="ghost" 
                  size="sm"
                  className="text-muted-foreground"
                >
                  Clear Filters
                </Button>
              )}
              <Button className="gradient-primary text-white">
                <Plus className="mr-2 h-4 w-4" />
                New Campaign
              </Button>
            </div>
          </div>
        </header>
        
        <main className="p-4 lg:p-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div>
                  <CardTitle>Campaign Management</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {filteredCampaigns.length} of {mockCampaigns.length} campaigns
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search campaigns..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 w-64"
                    />
                  </div>
                </div>
              </div>
              
              {showFilters && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={platformFilter} onValueChange={setPlatformFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Platforms</SelectItem>
                        {platforms.map(platform => (
                          <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("justify-start text-left font-normal", !dateRange && "text-muted-foreground")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange?.from ? (
                            dateRange.to ? (
                              <>
                                {format(dateRange.from, "LLL dd, y")} -{" "}
                                {format(dateRange.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(dateRange.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Pick a date range</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={dateRange?.from}
                          selected={dateRange}
                          onSelect={setDateRange}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  {/* Quick Date Presets */}
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-muted-foreground">Quick filters:</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        const now = new Date();
                        const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                        setDateRange({ from: lastWeek, to: now });
                      }}
                      className="h-6 text-xs"
                    >
                      Last 7 days
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        const now = new Date();
                        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
                        setDateRange({ from: lastMonth, to: now });
                      }}
                      className="h-6 text-xs"
                    >
                      Last 30 days
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        const now = new Date();
                        const lastThreeMonths = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
                        setDateRange({ from: lastThreeMonths, to: now });
                      }}
                      className="h-6 text-xs"
                    >
                      Last 3 months
                    </Button>
                  </div>
                </div>
              )}
            </CardHeader>
            
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign Name</TableHead>
                      <TableHead>Platform</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Spent</TableHead>
                      <TableHead>Conversions</TableHead>
                      <TableHead>CTR</TableHead>
                      <TableHead>Created Date</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCampaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell className="font-medium">{campaign.name}</TableCell>
                        <TableCell>{campaign.platform}</TableCell>
                        <TableCell>${parseFloat(campaign.budget).toLocaleString()}</TableCell>
                        <TableCell>${parseFloat(campaign.spent).toLocaleString()}</TableCell>
                        <TableCell>{campaign.conversions}</TableCell>
                        <TableCell>{campaign.ctr}%</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {format(campaign.createdAt, "MMM dd, yyyy")}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {format(campaign.updatedAt, "MMM dd, yyyy")}
                        </TableCell>
                        <TableCell>
                          <Badge variant={campaign.status === "active" ? "default" : campaign.status === "paused" ? "secondary" : "outline"}>
                            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button variant="ghost" size="sm">View</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}