import { Sidebar } from "@/components/dashboard/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Target, Zap } from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";

const performanceData = [
  { month: "Jan", clicks: 12400, conversions: 890, cost: 2340 },
  { month: "Feb", clicks: 13600, conversions: 980, cost: 2680 },
  { month: "Mar", clicks: 15200, conversions: 1240, cost: 3120 },
  { month: "Apr", clicks: 14800, conversions: 1180, cost: 2950 },
  { month: "May", clicks: 16500, conversions: 1450, cost: 3400 },
  { month: "Jun", clicks: 18200, conversions: 1620, cost: 3680 },
];

const channelData = [
  { name: "Google Ads", value: 45, color: "#3b82f6" },
  { name: "Facebook", value: 30, color: "#10b981" },
  { name: "Instagram", value: 15, color: "#8b5cf6" },
  { name: "LinkedIn", value: 10, color: "#f59e0b" },
];

const kpiData = [
  { label: "Click-through Rate", value: "3.24%", target: "3.50%", progress: 92, trend: "up" },
  { label: "Conversion Rate", value: "8.7%", target: "9.0%", progress: 97, trend: "up" },
  { label: "Cost per Acquisition", value: "$23.45", target: "$22.00", progress: 85, trend: "down" },
  { label: "Return on Ad Spend", value: "4.2x", target: "4.5x", progress: 93, trend: "up" },
];

export default function Performance() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="lg:ml-64 min-h-screen">
        <header className="bg-card border-b border-border p-4 lg:p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
            <div className="lg:pl-0 pl-12">
              <h1 className="text-xl lg:text-2xl font-bold text-foreground">Performance Analytics</h1>
              <p className="text-sm lg:text-base text-muted-foreground">
                Deep dive into campaign performance metrics and trends.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </header>
        
        <main className="p-4 lg:p-6 space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiData.map((kpi) => (
              <Card key={kpi.label}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {kpi.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-primary" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <span className={`text-sm font-medium ${
                      kpi.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}>
                      {kpi.trend === "up" ? "↗" : "↘"} {kpi.progress}%
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">{kpi.label}</h3>
                  <p className="text-2xl font-bold text-foreground mb-2">{kpi.value}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Target: {kpi.target}</span>
                    <Progress value={kpi.progress} className="w-16 h-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "var(--radius)",
                          color: "hsl(var(--foreground))"
                        }}
                        labelStyle={{ color: "hsl(var(--foreground))" }}
                        itemStyle={{ color: "hsl(var(--foreground))" }}
                      />
                      <Line type="monotone" dataKey="clicks" stroke="#3b82f6" strokeWidth={2} />
                      <Line type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Channel Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={channelData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {channelData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color}
                            style={{ 
                              filter: "drop-shadow(0 0 4px rgba(0,0,0,0.1))",
                              transition: "all 0.3s ease",
                              transformOrigin: "center"
                            }}
                            onMouseEnter={(e) => {
                              const target = e.target as SVGElement;
                              target.style.transform = "scale(1.05)";
                              target.style.filter = "drop-shadow(0 0 8px rgba(0,0,0,0.3)) brightness(1.1)";
                            }}
                            onMouseLeave={(e) => {
                              const target = e.target as SVGElement;
                              target.style.transform = "scale(1)";
                              target.style.filter = "drop-shadow(0 0 4px rgba(0,0,0,0.1))";
                            }}
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "var(--radius)",
                          color: "hsl(var(--foreground))"
                        }}
                        labelStyle={{ color: "hsl(var(--foreground))" }}
                        itemStyle={{ color: "hsl(var(--foreground))" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {channelData.map((channel) => (
                    <div key={channel.name} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: channel.color }}
                      />
                      <span className="text-sm text-muted-foreground">{channel.name}</span>
                      <span className="text-sm font-medium">{channel.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Cost Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Cost Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "var(--radius)",
                        color: "hsl(var(--foreground))"
                      }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                      itemStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Bar dataKey="cost" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}