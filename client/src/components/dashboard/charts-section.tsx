import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MoreHorizontal, Users as UsersIcon } from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  mockRevenueData, 
  mockCountryData, 
  mockRegionData, 
  mockPlatformData, 
  mockUserData 
} from "@/lib/mock-data";

export function ChartsSection() {
  return (
    <>
      {/* First Row Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Over Time Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Revenue Over Time</CardTitle>
              <div className="flex items-center space-x-6 mt-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
                  <span className="text-sm text-muted-foreground">Total Revenue</span>
                  <span className="text-sm font-medium text-foreground ml-2">$32,839.99</span>
                  <span className="text-xs text-green-600 dark:text-green-400 ml-2">55%</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    tickFormatter={(value) => `$${(value / 1000)}K`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)"
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="hsl(var(--chart-3))" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Session by Country */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Session by Country</CardTitle>
              <p className="text-sm text-muted-foreground">Showing Data for Top Session</p>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCountryData.map((country) => (
                <div key={country.country} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-lg mr-3">{country.flag}</span>
                    <span className="text-sm font-medium text-foreground">{country.country}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Progress value={country.percentage * 10} className="w-24" />
                    <span className="text-sm font-medium text-foreground w-8">{country.sessions}</span>
                    <span className="text-xs text-muted-foreground w-8">{country.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Row Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sales by Region (Radar Chart) */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Sales by Region</CardTitle>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={mockRegionData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="region" tick={{ fontSize: 12 }} />
                  <PolarRadiusAxis tick={{ fontSize: 10 }} />
                  <Radar
                    name="Sales"
                    dataKey="sales"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              {mockRegionData.map((region) => (
                <div key={region.region} className="text-center">
                  <div className="text-muted-foreground">{region.region}</div>
                  <div className="font-semibold text-foreground">{region.sales.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sales by E-commerce Platform (Donut Chart) */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Sales by E-commerce Platform</CardTitle>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockPlatformData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="percentage"
                  >
                    {mockPlatformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {mockPlatformData.map((platform) => (
                <div key={platform.platform} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: platform.color }}
                    ></div>
                    <span className="text-muted-foreground">{platform.platform}</span>
                  </div>
                  <span className="font-semibold text-foreground">{platform.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Registered Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Registered Users</CardTitle>
              <p className="text-sm text-muted-foreground">An overview of your users</p>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-32 h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockUserData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={65}
                      dataKey="users"
                    >
                      {mockUserData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">2,324</div>
                    <div className="text-xs text-muted-foreground">Total Users</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {mockUserData.map((user) => (
                <div key={user.plan} className="text-center">
                  <div className="text-muted-foreground">{user.plan} Plan</div>
                  <div className="font-semibold text-foreground">{user.users.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
