import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus, Edit, Eye, Star } from "lucide-react";

// Mock products data
const mockProducts = [
  {
    id: "PROD-001",
    name: "Premium Analytics Dashboard",
    category: "Software",
    price: 299.99,
    stock: 50,
    status: "active",
    rating: 4.8,
    sales: 127,
    image: "📊"
  },
  {
    id: "PROD-002", 
    name: "Basic Plan Subscription",
    category: "Subscription",
    price: 99.99,
    stock: 999,
    status: "active",
    rating: 4.5,
    sales: 89,
    image: "📈"
  },
  {
    id: "PROD-003",
    name: "Enterprise Suite",
    category: "Software",
    price: 999.99,
    stock: 25,
    status: "active", 
    rating: 4.9,
    sales: 34,
    image: "🚀"
  },
  {
    id: "PROD-004",
    name: "Marketing Tools Pack",
    category: "Tools",
    price: 199.99,
    stock: 0,
    status: "out_of_stock",
    rating: 4.3,
    sales: 156,
    image: "🎯"
  },
  {
    id: "PROD-005",
    name: "Data Visualization Suite",
    category: "Software",
    price: 499.99,
    stock: 75,
    status: "active",
    rating: 4.7,
    sales: 78,
    image: "📉"
  },
  {
    id: "PROD-006",
    name: "Mobile App Builder",
    category: "Tools",
    price: 149.99,
    stock: 10,
    status: "low_stock",
    rating: 4.4,
    sales: 95,
    image: "📱"
  }
];

const statusVariants = {
  active: "default",
  low_stock: "secondary",
  out_of_stock: "destructive",
  inactive: "outline"
} as const;

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || product.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = Array.from(new Set(mockProducts.map(p => p.category)));
  const totalProducts = mockProducts.length;
  const activeProducts = mockProducts.filter(p => p.status === "active").length;
  const totalValue = mockProducts.reduce((sum, product) => sum + (product.price * product.stock), 0);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="lg:ml-64 min-h-screen">
        <header className="bg-card border-b border-border p-4 lg:p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
            <div className="lg:pl-0 pl-12">
              <h1 className="text-xl lg:text-2xl font-bold text-foreground">Products Management</h1>
              <p className="text-sm lg:text-base text-muted-foreground">
                Manage your product catalog and inventory.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button onClick={() => setShowFilters(!showFilters)} variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filters
                {(categoryFilter !== "all" || statusFilter !== "all") && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                    {[categoryFilter !== "all", statusFilter !== "all"].filter(Boolean).length}
                  </span>
                )}
              </Button>
              {(categoryFilter !== "all" || statusFilter !== "all") && (
                <Button 
                  onClick={() => {
                    setCategoryFilter("all");
                    setStatusFilter("all");
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
                Add Product
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
                    <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                    <p className="text-3xl font-bold text-foreground">{totalProducts}</p>
                  </div>
                  <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-lg">📦</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Products</p>
                    <p className="text-3xl font-bold text-foreground">{activeProducts}</p>
                  </div>
                  <div className="h-8 w-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-lg">✅</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Inventory Value</p>
                    <p className="text-3xl font-bold text-foreground">${totalValue.toLocaleString()}</p>
                  </div>
                  <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <span className="text-lg">💰</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div>
                  <CardTitle>Product Catalog</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {filteredProducts.length} of {mockProducts.length} products
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 w-64"
                    />
                  </div>
                </div>
              </div>
              
              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="low_stock">Low Stock</SelectItem>
                      <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-4xl">{product.image}</div>
                        <Badge variant={statusVariants[product.status as keyof typeof statusVariants]}>
                          {product.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      
                      <h3 className="font-semibold text-foreground mb-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                      
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">{product.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground ml-2">({product.sales} sales)</span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-2xl font-bold text-foreground">${product.price}</p>
                          <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="flex-1">
                          <Eye className="mr-1 h-3 w-3" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm" className="flex-1">
                          <Edit className="mr-1 h-3 w-3" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}