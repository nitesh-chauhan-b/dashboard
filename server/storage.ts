import { type User, type InsertUser, type Campaign, type InsertCampaign, type Metrics, type InsertMetrics, type Product, type InsertProduct, type Order, type InsertOrder } from "@shared/schema";
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
  
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, updates: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;
  
  getOrders(): Promise<Order[]>;
  getOrder(id: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: string, updates: Partial<InsertOrder>): Promise<Order | undefined>;
  deleteOrder(id: string): Promise<boolean>;
  
  getMetrics(): Promise<Metrics>;
  updateMetrics(metrics: InsertMetrics): Promise<Metrics>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private campaigns: Map<string, Campaign>;
  private products: Map<string, Product>;
  private orders: Map<string, Order>;
  private metrics: Metrics = {
    id: randomUUID(),
    totalRevenue: "32499.93",
    totalUsers: 5211832,
    conversions: 2324,
    growthRate: "4.83",
    date: new Date(),
  };

  constructor() {
    this.users = new Map();
    this.campaigns = new Map();
    this.products = new Map();
    this.orders = new Map();
    
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
        startDate: new Date(2024, 5, 1),
        endDate: new Date(2024, 7, 31),
      },
      {
        name: "Black Friday Promotion",
        platform: "Facebook Ads",
        budget: "8000.00",
        spent: "7200.00",
        conversions: 289,
        ctr: "4.10",
        status: "active",
        startDate: new Date(2024, 10, 15),
        endDate: new Date(2024, 10, 30),
      },
      {
        name: "Holiday Campaign",
        platform: "Instagram",
        budget: "3000.00",
        spent: "2100.00",
        conversions: 98,
        ctr: "2.80",
        status: "paused",
        startDate: new Date(2024, 11, 1),
        endDate: new Date(2024, 11, 25),
      },
    ];

    mockCampaigns.forEach(campaign => {
      const id = randomUUID();
      const fullCampaign: Campaign = {
        id,
        name: campaign.name,
        platform: campaign.platform,
        budget: campaign.budget,
        spent: campaign.spent || "0",
        conversions: campaign.conversions || 0,
        ctr: campaign.ctr || "0",
        status: campaign.status || "active",
        startDate: campaign.startDate || new Date(),
        endDate: campaign.endDate || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.campaigns.set(id, fullCampaign);
    });

    // Initialize products
    const mockProducts: InsertProduct[] = [
      {
        name: "Premium Wireless Headphones",
        category: "Electronics",
        price: "199.99",
        stock: 45,
        sku: "PWH-001",
        description: "High-quality wireless headphones with noise cancellation",
        status: "active",
        rating: "4.5",
        sales: 234,
        image: "🎧"
      },
      {
        name: "Smart Fitness Watch",
        category: "Electronics",
        price: "299.99",
        stock: 8,
        sku: "SFW-002",
        description: "Advanced fitness tracking with heart rate monitoring",
        status: "low_stock",
        rating: "4.7",
        sales: 156,
        image: "⌚"
      },
      {
        name: "Organic Cotton T-Shirt",
        category: "Clothing",
        price: "29.99",
        stock: 120,
        sku: "OCT-003",
        description: "100% organic cotton, eco-friendly t-shirt",
        status: "active",
        rating: "4.2",
        sales: 789,
        image: "👕"
      }
    ];

    mockProducts.forEach(product => {
      const id = randomUUID();
      const fullProduct: Product = {
        id,
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock || 0,
        sku: product.sku,
        description: product.description || null,
        status: product.status || 'active',
        rating: product.rating || null,
        sales: product.sales || 0,
        image: product.image || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.products.set(id, fullProduct);
    });

    // Initialize orders
    const mockOrders: InsertOrder[] = [
      {
        customer: "John Smith",
        email: "john@example.com",
        product: "Premium Wireless Headphones",
        amount: "199.99",
        status: "completed",
        tracking: "TRK001234567"
      },
      {
        customer: "Sarah Johnson",
        email: "sarah@example.com",
        product: "Smart Fitness Watch",
        amount: "299.99",
        status: "shipped",
        tracking: "TRK001234568"
      },
      {
        customer: "Mike Brown",
        email: "mike@example.com",
        product: "Organic Cotton T-Shirt",
        amount: "29.99",
        status: "processing"
      }
    ];

    mockOrders.forEach(order => {
      const id = randomUUID();
      const fullOrder: Order = {
        id,
        customer: order.customer,
        email: order.email,
        product: order.product,
        amount: order.amount,
        status: order.status || 'pending',
        tracking: order.tracking || null,
        date: new Date(),
      };
      this.orders.set(id, fullOrder);
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
      id,
      name: insertCampaign.name,
      platform: insertCampaign.platform,
      budget: insertCampaign.budget,
      spent: insertCampaign.spent || "0",
      conversions: insertCampaign.conversions || 0,
      ctr: insertCampaign.ctr || "0",
      status: insertCampaign.status || "active",
      startDate: insertCampaign.startDate,
      endDate: insertCampaign.endDate || null,
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

  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = {
      id,
      name: insertProduct.name,
      category: insertProduct.category,
      price: insertProduct.price,
      stock: insertProduct.stock || 0,
      sku: insertProduct.sku,
      description: insertProduct.description || null,
      status: insertProduct.status || 'active',
      rating: insertProduct.rating || null,
      sales: insertProduct.sales || 0,
      image: insertProduct.image || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: string, updates: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;

    const updatedProduct: Product = {
      ...product,
      ...updates,
      updatedAt: new Date(),
    };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.products.delete(id);
  }

  // Order methods
  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = {
      id,
      customer: insertOrder.customer,
      email: insertOrder.email,
      product: insertOrder.product,
      amount: insertOrder.amount,
      status: insertOrder.status || 'pending',
      tracking: insertOrder.tracking || null,
      date: new Date(),
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrder(id: string, updates: Partial<InsertOrder>): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;

    const updatedOrder: Order = {
      ...order,
      ...updates,
    };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  async deleteOrder(id: string): Promise<boolean> {
    return this.orders.delete(id);
  }
}

export const storage = new MemStorage();
