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
  const platforms = ["Facebook", "Google Ads", "Instagram", "LinkedIn", "TikTok", "Twitter", "YouTube", "Snapchat"];
  const statuses = ["active", "paused", "completed"] as const;
  const campaignTypes = [
    "Holiday Sale", "Spring Launch", "Summer Promo", "Black Friday", "New Product", 
    "Brand Awareness", "Lead Generation", "Retargeting", "Flash Sale", "Valentine's Day",
    "Back to School", "Cyber Monday", "Christmas Special", "New Year Campaign", "Easter Sale",
    "Mother's Day", "Father's Day", "Memorial Day", "Labor Day", "Halloween Campaign",
    "Product Launch", "Seasonal Collection", "Limited Edition", "Early Bird", "Clearance Sale",
    "Customer Appreciation", "Loyalty Program", "Referral Campaign", "App Download", "Newsletter Signup"
  ];
  
  const now = new Date();
  
  for (let i = 0; i < 100; i++) {
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const campaignType = campaignTypes[Math.floor(Math.random() * campaignTypes.length)];
    const budget = 500 + Math.random() * 15000;
    const spent = budget * (0.2 + Math.random() * 0.7);
    const conversions = Math.floor(spent / (10 + Math.random() * 40));
    const ctr = (0.8 + Math.random() * 4.5).toFixed(1);
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    // Generate more realistic date ranges - spread over last 12 months
    const createdDate = new Date(now);
    createdDate.setMonth(createdDate.getMonth() - Math.floor(Math.random() * 12));
    createdDate.setDate(Math.floor(Math.random() * 28) + 1);
    createdDate.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
    
    const updatedDate = new Date(createdDate);
    updatedDate.setDate(updatedDate.getDate() + Math.floor(Math.random() * 45));
    
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
  
  // Sort campaigns by creation date (newest first)
  return campaigns.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
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
  { platform: "Amazon", percentage: 45, color: "#3b82f6" },
  { platform: "Tokopedia", percentage: 25, color: "#10b981" },
  { platform: "Alibaba", percentage: 30, color: "#8b5cf6" },
];

export const mockUserData = [
  { plan: "Premium", users: 1809, color: "#3b82f6" },
  { plan: "Basic", users: 515, color: "#10b981" },
];
