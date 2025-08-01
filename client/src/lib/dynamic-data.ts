// Dynamic data simulation for analytics dashboard
export class DynamicDataSimulator {
  private static instance: DynamicDataSimulator;
  private baseMetrics = {
    totalRevenue: 32499.93,
    totalUsers: 5211832,
    conversions: 2324,
    growthRate: 4.83,
  };

  private lastUpdate = Date.now();
  private updateInterval = 5000; // Update every 5 seconds

  static getInstance(): DynamicDataSimulator {
    if (!DynamicDataSimulator.instance) {
      DynamicDataSimulator.instance = new DynamicDataSimulator();
    }
    return DynamicDataSimulator.instance;
  }

  private generateVariation(base: number, percentage: number = 0.05): number {
    const variation = base * percentage * (Math.random() - 0.5) * 2;
    return Math.max(0, base + variation);
  }

  getCurrentMetrics() {
    const now = Date.now();
    
    // Update metrics every interval
    if (now - this.lastUpdate > this.updateInterval) {
      this.lastUpdate = now;
    }

    return {
      totalRevenue: this.generateVariation(this.baseMetrics.totalRevenue, 0.02),
      totalUsers: Math.floor(this.generateVariation(this.baseMetrics.totalUsers, 0.01)),
      conversions: Math.floor(this.generateVariation(this.baseMetrics.conversions, 0.03)),
      growthRate: this.generateVariation(this.baseMetrics.growthRate, 0.1),
    };
  }

  generateRevenueChartData() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const baseValues = [4000, 3000, 5000, 4500, 6000, 5500];
    
    return months.map((month, index) => ({
      month,
      revenue: this.generateVariation(baseValues[index], 0.15),
      target: baseValues[index] * 1.1,
    }));
  }

  generateTrafficData() {
    const sources = ['Direct', 'Social', 'Email', 'Search', 'Referral'];
    const baseValues = [30, 25, 20, 15, 10];
    
    return sources.map((source, index) => ({
      source,
      visitors: this.generateVariation(baseValues[index], 0.2),
      fill: `hsl(${index * 72}, 70%, 50%)`,
    }));
  }

  generateConversionData() {
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    });

    const baseRates = [2.1, 2.8, 3.2, 2.9, 3.5, 4.1, 3.8];
    
    return days.map((day, index) => ({
      day,
      rate: this.generateVariation(baseRates[index], 0.15),
    }));
  }

  generateCampaignMetrics(campaignId: string) {
    // Generate consistent but varied metrics for each campaign
    const seed = campaignId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const random = () => Math.sin(seed * Date.now() / 1000000) * 0.5 + 0.5;
    
    return {
      impressions: Math.floor(random() * 100000 + 50000),
      clicks: Math.floor(random() * 5000 + 1000),
      spend: random() * 1000 + 500,
      conversions: Math.floor(random() * 100 + 20),
    };
  }
}

export const dynamicData = DynamicDataSimulator.getInstance();