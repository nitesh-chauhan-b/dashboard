import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Users, TrendingUp, Percent } from "lucide-react";
import { useEffect, useState } from "react";
import { dynamicData } from "@/lib/dynamic-data";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: React.ReactNode;
  color: string;
}

function MetricCard({ title, value, change, changeType, icon, color }: MetricCardProps) {
  const [animatedValue, setAnimatedValue] = useState("0");
  
  useEffect(() => {
    const numericValue = parseFloat(value.replace(/[$,]/g, ""));
    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        current = numericValue;
        clearInterval(timer);
      }
      
      if (value.includes("$")) {
        setAnimatedValue("$" + current.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
      } else if (value.includes("%")) {
        setAnimatedValue(current.toFixed(2) + "%");
      } else {
        setAnimatedValue(Math.floor(current).toLocaleString());
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [value]);

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            {icon}
          </div>
          <span className={`text-sm font-medium ${
            changeType === "positive" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
          }`}>
            {change}
          </span>
        </div>
        <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
        <p className="text-3xl font-bold text-foreground animate-counter">{animatedValue}</p>
        <p className="text-xs text-muted-foreground mt-2">Compared to last month</p>
      </CardContent>
    </Card>
  );
}

export function MetricsCards() {
  const [metrics, setMetrics] = useState(dynamicData.getCurrentMetrics());

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(dynamicData.getCurrentMetrics());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <MetricCard
        title="Total Revenue"
        value={`$${metrics.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        change="+12.5%"
        changeType="positive"
        icon={<DollarSign className="h-6 w-6 text-white" />}
        color=""
      />
      
      <MetricCard
        title="Total Users"
        value={metrics.totalUsers.toLocaleString()}
        change="+8.2%"
        changeType="positive"
        icon={<Users className="h-6 w-6 text-white" />}
        color=""
      />
      
      <MetricCard
        title="Conversions"
        value={metrics.conversions.toLocaleString()}
        change="-2.4%"
        changeType="negative"
        icon={<TrendingUp className="h-6 w-6 text-white" />}
        color=""
      />
      
      <MetricCard
        title="Growth Rate"
        value={`${metrics.growthRate.toFixed(2)}%`}
        change="+15.3%"
        changeType="positive"
        icon={<Percent className="h-6 w-6 text-white" />}
        color=""
      />
    </div>
  );
}
