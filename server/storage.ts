import { type User, type InsertUser, type Campaign, type InsertCampaign, type Metrics, type InsertMetrics } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getCampaigns(): Promise<Campaign[]>;
  getCampaign(id: string): Promise<Campaign | undefined>;
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  updateCampaign(id: string, updates: Partial<InsertCampaign>): Promise<Campaign | undefined>;
  deleteCampaign(id: string): Promise<boolean>;
  
  getMetrics(): Promise<Metrics>;
  updateMetrics(metrics: InsertMetrics): Promise<Metrics>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private campaigns: Map<string, Campaign>;
  private metrics: Metrics;

  constructor() {
    this.users = new Map();
    this.campaigns = new Map();
    
    // Initialize with mock data
    this.initializeMockData();
  }

  private initializeMockData() {
    // Initialize metrics
    this.metrics = {
      id: randomUUID(),
      totalRevenue: "32499.93",
      totalUsers: 5211832,
      conversions: 2324,
      growthRate: "4.83",
      date: new Date(),
    };

    // Initialize campaigns
    const mockCampaigns: InsertCampaign[] = [
      {
        name: "Summer Sale 2024",
        platform: "Google Ads",
        budget: "5000.00",
        spent: "3420.00",
        conversions: 156,
        ctr: "3.20",
        status: "active",
      },
      {
        name: "Black Friday Promotion",
        platform: "Facebook Ads",
        budget: "8000.00",
        spent: "7200.00",
        conversions: 289,
        ctr: "4.10",
        status: "active",
      },
      {
        name: "Holiday Campaign",
        platform: "Instagram",
        budget: "3000.00",
        spent: "2100.00",
        conversions: 98,
        ctr: "2.80",
        status: "paused",
      },
    ];

    mockCampaigns.forEach(campaign => {
      const id = randomUUID();
      const fullCampaign: Campaign = {
        ...campaign,
        id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.campaigns.set(id, fullCampaign);
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Campaign methods
  async getCampaigns(): Promise<Campaign[]> {
    return Array.from(this.campaigns.values());
  }

  async getCampaign(id: string): Promise<Campaign | undefined> {
    return this.campaigns.get(id);
  }

  async createCampaign(insertCampaign: InsertCampaign): Promise<Campaign> {
    const id = randomUUID();
    const campaign: Campaign = {
      ...insertCampaign,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.campaigns.set(id, campaign);
    return campaign;
  }

  async updateCampaign(id: string, updates: Partial<InsertCampaign>): Promise<Campaign | undefined> {
    const campaign = this.campaigns.get(id);
    if (!campaign) return undefined;

    const updatedCampaign: Campaign = {
      ...campaign,
      ...updates,
      updatedAt: new Date(),
    };
    this.campaigns.set(id, updatedCampaign);
    return updatedCampaign;
  }

  async deleteCampaign(id: string): Promise<boolean> {
    return this.campaigns.delete(id);
  }

  // Metrics methods
  async getMetrics(): Promise<Metrics> {
    return this.metrics;
  }

  async updateMetrics(insertMetrics: InsertMetrics): Promise<Metrics> {
    this.metrics = {
      ...this.metrics,
      ...insertMetrics,
      date: new Date(),
    };
    return this.metrics;
  }
}

export const storage = new MemStorage();
