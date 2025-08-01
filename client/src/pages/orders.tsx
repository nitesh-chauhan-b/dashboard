import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Package, Eye, Truck } from "lucide-react";
import { format } from "date-fns";

// Mock orders data
const mockOrders = [
  {
    id: "ORD-2025-001",
    customer: "John Smith",
    email: "john@example.com",
    product: "Premium Analytics Dashboard",
    amount: 299.99,
    status: "completed",
    date: new Date(2025, 0, 15),
    tracking: "TRK123456789"
  },
  {
    id: "ORD-2025-002", 
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    product: "Basic Plan Subscription",
    amount: 99.99,
    status: "processing",
    date: new Date(2025, 0, 14),
    tracking: "TRK987654321"
  },
  {
    id: "ORD-2025-003",
    customer: "Mike Wilson",
    email: "mike@example.com", 
    product: "Enterprise Suite",
    amount: 999.99,
    status: "shipped",
    date: new Date(2025, 0, 13),
    tracking: "TRK456789123"
  },
  {
    id: "ORD-2025-004",
    customer: "Emma Davis",
    email: "emma@example.com",
    product: "Marketing Tools Pack",
    amount: 199.99,
    status: "pending",
    date: new Date(2025, 0, 12),
    tracking: null
  },
  {
    id: "ORD-2025-005",
    customer: "Alex Chen",
    email: "alex@example.com",
    product: "Data Visualization Suite",
    amount: 499.99,
    status: "completed",
    date: new Date(2025, 0, 11),
    tracking: "TRK789123456"
  }
];

const statusVariants = {
  completed: "default",
  processing: "secondary", 
  shipped: "outline",
  pending: "destructive"
} as const;

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.amount, 0);
  const completedOrders = mockOrders.filter(o => o.status === "completed").length;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="lg:ml-64 min-h-screen">
        <header className="bg-card border-b border-border p-4 lg:p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
            <div className="lg:pl-0 pl-12">
              <h1 className="text-xl lg:text-2xl font-bold text-foreground">Orders Management</h1>
              <p className="text-sm lg:text-base text-muted-foreground">
                Track and manage customer orders and shipments.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button onClick={() => setShowFilters(!showFilters)} variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <Button className="gradient-primary text-white">
                <Package className="mr-2 h-4 w-4" />
                New Order
              </Button>
            </div>
          </div>
        </header>
        
        <main className="p-4 lg:p-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                    <p className="text-3xl font-bold text-foreground">{mockOrders.length}</p>
                  </div>
                  <Package className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <p className="text-3xl font-bold text-foreground">${totalRevenue.toLocaleString()}</p>
                  </div>
                  <div className="h-8 w-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-lg">💰</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed Orders</p>
                    <p className="text-3xl font-bold text-foreground">{completedOrders}</p>
                  </div>
                  <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-lg">✅</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div>
                  <CardTitle>Order Management</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {filteredOrders.length} of {mockOrders.length} orders
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search orders..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 w-64"
                    />
                  </div>
                </div>
              </div>
              
              {showFilters && (
                <div className="pt-4 border-t">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardHeader>
            
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tracking</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{order.customer}</div>
                            <div className="text-sm text-muted-foreground">{order.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{order.product}</TableCell>
                        <TableCell className="font-medium">${order.amount.toFixed(2)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {format(order.date, "MMM dd, yyyy")}
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusVariants[order.status as keyof typeof statusVariants]}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {order.tracking ? (
                            <div className="flex items-center text-sm">
                              <Truck className="mr-1 h-3 w-3" />
                              {order.tracking}
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-sm">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="mr-1 h-3 w-3" />
                              View
                            </Button>
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