import type { VercelRequest, VercelResponse } from '@vercel/node';
import { MemStorage } from '../server/storage';

const storage = new MemStorage();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  switch (req.method) {
    case 'GET':
      try {
        const products = await storage.getProducts();
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch products" });
      }
      break;

    case 'POST':
      try {
        const product = await storage.createProduct(req.body);
        res.status(201).json(product);
      } catch (error) {
        res.status(500).json({ message: "Failed to create product" });
      }
      break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}