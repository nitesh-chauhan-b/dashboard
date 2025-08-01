import { Campaign } from "@shared/schema";

const STORAGE_KEYS = {
  CAMPAIGNS: 'admybrand_campaigns',
  ORDERS: 'admybrand_orders',
  PRODUCTS: 'admybrand_products',
  METRICS: 'admybrand_metrics'
};

export interface Order {
  id: string;
  customer: string;
  email: string;
  product: string;
  amount: number;
  status: 'completed' | 'processing' | 'shipped' | 'pending';
  date: Date;
  tracking?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'low_stock' | 'out_of_stock' | 'inactive';
  rating: number;
  sales: number;
  image: string;
}

// Generic storage functions
export function saveToStorage<T>(key: string, data: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

export function loadFromStorage<T>(key: string): T[] {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return [];
  }
}

// Campaign storage functions
export function saveCampaigns(campaigns: Campaign[]): void {
  saveToStorage(STORAGE_KEYS.CAMPAIGNS, campaigns);
}

export function loadCampaigns(): Campaign[] {
  const campaigns = loadFromStorage<Campaign>(STORAGE_KEYS.CAMPAIGNS);
  // Convert date strings back to Date objects and handle all date fields
  return campaigns.map(campaign => ({
    ...campaign,
    startDate: campaign.startDate ? new Date(campaign.startDate) : new Date(),
    endDate: campaign.endDate ? new Date(campaign.endDate) : null,
    createdAt: campaign.createdAt ? new Date(campaign.createdAt) : new Date(),
    updatedAt: campaign.updatedAt ? new Date(campaign.updatedAt) : new Date()
  }));
}

// Order storage functions
export function saveOrders(orders: Order[]): void {
  saveToStorage(STORAGE_KEYS.ORDERS, orders);
}

export function loadOrders(): Order[] {
  const orders = loadFromStorage<Order>(STORAGE_KEYS.ORDERS);
  // Convert date strings back to Date objects
  return orders.map(order => ({
    ...order,
    date: new Date(order.date)
  }));
}

// Product storage functions
export function saveProducts(products: Product[]): void {
  saveToStorage(STORAGE_KEYS.PRODUCTS, products);
}

export function loadProducts(): Product[] {
  return loadFromStorage<Product>(STORAGE_KEYS.PRODUCTS);
}

// Initialize with default data if empty
export function initializeStorage(): void {
  if (loadCampaigns().length === 0) {
    // Import and save initial campaign data
    import('./mock-data').then(({ mockCampaigns }) => {
      saveCampaigns(mockCampaigns);
    });
  }
  
  if (loadOrders().length === 0) {
    // Generate initial orders
    const initialOrders: Order[] = Array.from({ length: 100 }, (_, i) => ({
      id: `ORD-2025-${String(i + 1).padStart(3, '0')}`,
      customer: `Customer ${i + 1}`,
      email: `customer${i + 1}@example.com`,
      product: `Product ${Math.floor(Math.random() * 10) + 1}`,
      amount: Math.round((Math.random() * 500 + 50) * 100) / 100,
      status: ['completed', 'processing', 'shipped', 'pending'][Math.floor(Math.random() * 4)] as Order['status'],
      date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
      tracking: Math.random() > 0.3 ? `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}` : undefined
    }));
    saveOrders(initialOrders);
  }
  
  if (loadProducts().length === 0) {
    // Generate initial products
    const productNames = [
      'Premium Analytics Dashboard', 'Basic Plan Subscription', 'Enterprise Suite',
      'Marketing Tools Pack', 'Data Visualization Suite', 'Mobile App Builder',
      'SEO Optimizer Pro', 'Email Campaign Manager', 'Social Media Scheduler',
      'Customer Insights Pro'
    ];
    
    const categories = ['Software', 'Subscription', 'Tools', 'Analytics'];
    const emojis = ['📊', '📈', '🚀', '🎯', '📉', '📱', '🔍', '📧', '📅', '👥'];
    
    const initialProducts: Product[] = productNames.map((name, i) => ({
      id: `PROD-${String(i + 1).padStart(3, '0')}`,
      name,
      category: categories[Math.floor(Math.random() * categories.length)],
      price: Math.round((Math.random() * 800 + 100) * 100) / 100,
      stock: Math.floor(Math.random() * 100),
      status: ['active', 'low_stock', 'out_of_stock', 'inactive'][Math.floor(Math.random() * 4)] as Product['status'],
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
      sales: Math.floor(Math.random() * 200),
      image: emojis[i % emojis.length]
    }));
    saveProducts(initialProducts);
  }
}