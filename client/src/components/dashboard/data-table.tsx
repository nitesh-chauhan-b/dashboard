import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit2, Trash2, ChevronUp, ChevronDown, Plus } from "lucide-react";
import { Campaign } from "@shared/schema";
import { CampaignModal } from "@/components/modals/campaign-modal";
import { saveCampaigns, loadCampaigns, initializeStorage } from "@/lib/local-storage";
import { useToast } from "@/hooks/use-toast";

type SortField = keyof Campaign | null;
type SortDirection = "asc" | "desc";

interface DataTableProps {
  dateFilter?: string;
}

export function DataTable({ dateFilter }: DataTableProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'create'>('view');
  
  const { toast } = useToast();

  // Initialize and load data
  useEffect(() => {
    initializeStorage();
    const loadedCampaigns = loadCampaigns();
    setCampaigns(loadedCampaigns);
  }, []);
  
  const itemsPerPage = 10;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedCampaigns = useMemo(() => {
    let filtered = campaigns.filter((campaign) => {
      const matchesSearch = 
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.platform.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    if (sortField) {
      filtered.sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];
        
        // Handle numeric fields
        if (sortField === "budget" || sortField === "spent" || sortField === "ctr") {
          aValue = parseFloat(aValue as string) || 0;
          bValue = parseFloat(bValue as string) || 0;
        }
        
        if (aValue! < bValue!) return sortDirection === "asc" ? -1 : 1;
        if (aValue! > bValue!) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [campaigns, searchTerm, statusFilter, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredAndSortedCampaigns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredAndSortedCampaigns.slice(startIndex, endIndex);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "paused":
        return "secondary";
      case "completed":
        return "outline";
      default:
        return "outline";
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? 
      <ChevronUp className="ml-1 h-4 w-4" /> : 
      <ChevronDown className="ml-1 h-4 w-4" />;
  };

  // CRUD functions
  const handleEdit = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setModalMode('edit');
    setModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedCampaign(null);
    setModalMode('create');
    setModalOpen(true);
  };

  const handleSave = (campaignData: Partial<Campaign>) => {
    let updatedCampaigns = [...campaigns];
    
    if (modalMode === 'create') {
      const newCampaign: Campaign = {
        ...campaignData as Campaign,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      updatedCampaigns.unshift(newCampaign);
      toast({
        title: "Campaign Created",
        description: "New campaign has been created successfully.",
      });
    } else if (modalMode === 'edit' && selectedCampaign) {
      const index = updatedCampaigns.findIndex(c => c.id === selectedCampaign.id);
      if (index !== -1) {
        updatedCampaigns[index] = {
          ...updatedCampaigns[index],
          ...campaignData,
          updatedAt: new Date()
        };
        toast({
          title: "Campaign Updated",
          description: "Campaign has been updated successfully.",
        });
      }
    }
    
    setCampaigns(updatedCampaigns);
    saveCampaigns(updatedCampaigns);
  };

  const handleDelete = (campaignId: string) => {
    const updatedCampaigns = campaigns.filter(c => c.id !== campaignId);
    setCampaigns(updatedCampaigns);
    saveCampaigns(updatedCampaigns);
    toast({
      title: "Campaign Deleted",
      description: "Campaign has been deleted successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col space-y-4">
          <div>
            <CardTitle>Campaign Performance</CardTitle>
            <p className="text-sm text-muted-foreground">
              Detailed breakdown of your marketing campaigns
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-3 sm:flex-row w-full sm:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleCreate} className="gradient-primary text-white w-full sm:w-auto whitespace-nowrap">
                <Plus className="mr-2 h-4 w-4" />
                New Campaign
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 transition-colors whitespace-nowrap"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    Campaign Name
                    <SortIcon field="name" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 transition-colors whitespace-nowrap"
                  onClick={() => handleSort("platform")}
                >
                  <div className="flex items-center">
                    Platform
                    <SortIcon field="platform" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 transition-colors whitespace-nowrap"
                  onClick={() => handleSort("budget")}
                >
                  <div className="flex items-center">
                    Budget
                    <SortIcon field="budget" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 transition-colors whitespace-nowrap"
                  onClick={() => handleSort("spent")}
                >
                  <div className="flex items-center">
                    Spent
                    <SortIcon field="spent" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 transition-colors whitespace-nowrap"
                  onClick={() => handleSort("conversions")}
                >
                  <div className="flex items-center">
                    Conversions
                    <SortIcon field="conversions" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50 transition-colors whitespace-nowrap"
                  onClick={() => handleSort("ctr")}
                >
                  <div className="flex items-center">
                    CTR
                    <SortIcon field="ctr" />
                  </div>
                </TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className="whitespace-nowrap">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((campaign) => (
                <TableRow key={campaign.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium whitespace-nowrap">{campaign.name}</TableCell>
                  <TableCell className="whitespace-nowrap">{campaign.platform}</TableCell>
                  <TableCell className="whitespace-nowrap">${parseFloat(campaign.budget).toLocaleString()}</TableCell>
                  <TableCell className="whitespace-nowrap">${parseFloat(campaign.spent).toLocaleString()}</TableCell>
                  <TableCell className="whitespace-nowrap">{campaign.conversions}</TableCell>
                  <TableCell className="whitespace-nowrap">{campaign.ctr}%</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Badge variant={getStatusVariant(campaign.status)}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEdit(campaign)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(campaign.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
          <div className="text-sm text-muted-foreground order-2 sm:order-1">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredAndSortedCampaigns.length)} of{" "}
            {filteredAndSortedCampaigns.length} results
          </div>
          <div className="flex items-center space-x-2 order-1 sm:order-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            <div className="hidden sm:flex items-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
            </div>
            
            <div className="sm:hidden flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
      
      {/* Campaign Modal */}
      <CampaignModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        campaign={selectedCampaign}
        mode={modalMode}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </Card>
  );
}
