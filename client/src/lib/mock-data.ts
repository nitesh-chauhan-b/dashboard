import { Campaign, Metrics } from "@shared/schema";

export const mockMetrics: Metrics = {
  id: "1",
  totalRevenue: "32499.93",
  totalUsers: 5211832,
  conversions: 2324,
  growthRate: "4.83",
  date: new Date(),
};

// Generate dynamic campaign data based on current time
const generateCampaignData = (): Campaign[] => {
  const campaigns = [];
  const platforms = ["Facebook", "Google Ads", "Instagram", "LinkedIn", "TikTok"];
  const statuses = ["active", "paused", "completed"] as const;
  const campaignTypes = ["Holiday Sale", "Spring Launch", "Summer Promo", "Black Friday", "New Product", "Brand Awareness", "Lead Generation", "Retargeting", "Flash Sale", "Valentine's Day"];
  
  for (let i = 0; i < 12; i++) {
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const campaignType = campaignTypes[Math.floor(Math.random() * campaignTypes.length)];
    const budget = 1000 + Math.random() * 9000;
    const spent = budget * (0.3 + Math.random() * 0.6);
    const conversions = Math.floor(spent / (15 + Math.random() * 35));
    const ctr = (1 + Math.random() * 4).toFixed(1);
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    const createdDate = new Date();
    createdDate.setMonth(createdDate.getMonth() - Math.floor(Math.random() * 6));
    
    const updatedDate = new Date(createdDate);
    updatedDate.setDate(updatedDate.getDate() + Math.floor(Math.random() * 30));
    
    campaigns.push({
      id: (i + 1).toString(),
      name: `${campaignType} Campaign`,
      platform,
      budget: budget.toFixed(2),
      spent: spent.toFixed(2),
      conversions,
      ctr,
      status,
      createdAt: createdDate,
      updatedAt: updatedDate,
    });
  }
  
  return campaigns;
};

export const mockCampaigns: Campaign[] = generateCampaignData();

// Generate dynamic revenue data based on current time
const generateRevenueData = () => {
  const data = [];
  const now = new Date();
  
  for (let i = 7; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    // Simulate realistic revenue data with some randomness
    const baseRevenue = 15000 + (Math.random() * 10000);
    const seasonalMultiplier = 1 + (Math.sin((date.getMonth() / 12) * Math.PI * 2) * 0.3);
    const trendMultiplier = 1 + ((7 - i) * 0.05); // Growth trend
    
    const revenue = Math.round(baseRevenue * seasonalMultiplier * trendMultiplier);
    const target = Math.round(revenue * (0.9 + Math.random() * 0.2));
    
    data.push({
      month: monthName,
      revenue,
      target
    });
  }
  
  return data;
};

export const mockRevenueData = generateRevenueData();

export const mockCountryData = [
  { country: "Australia", sessions: 634, percentage: 8, flag: "🇦🇺" },
  { country: "Indonesia", sessions: 589, percentage: 7.2, flag: "🇮🇩" },
  { country: "Thailand", sessions: 562, percentage: 6.2, flag: "🇹🇭" },
  { country: "Germany", sessions: 453, percentage: 5.4, flag: "🇩🇪" },
];

export const mockRegionData = [
  { region: "Europe", sales: 2728 },
  { region: "Americas", sales: 2409 },
  { region: "Asia", sales: 2843 },
  { region: "Africa", sales: 3028 },
  { region: "Pacific", sales: 1838 },
  { region: "Middle East", sales: 800 },
];

export const mockPlatformData = [
  { platform: "Amazon", percentage: 45, color: "hsl(var(--chart-1))" },
  { platform: "Tokopedia", percentage: 25, color: "hsl(var(--chart-2))" },
  { platform: "Alibaba", percentage: 30, color: "hsl(var(--chart-3))" },
];

export const mockUserData = [
  { plan: "Premium", users: 1809, color: "hsl(var(--chart-1))" },
  { plan: "Basic", users: 515, color: "hsl(var(--muted))" },
];
