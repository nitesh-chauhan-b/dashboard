import type { VercelRequest, VercelResponse } from '@vercel/node';
import { MemStorage } from '../../server/storage';

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

  const { id } = req.query;

  if (typeof id !== 'string') {
    res.status(400).json({ message: 'Invalid campaign ID' });
    return;
  }

  switch (req.method) {
    case 'GET':
      try {
        const campaign = await storage.getCampaign(id);
        if (!campaign) {
          return res.status(404).json({ message: "Campaign not found" });
        }
        res.status(200).json(campaign);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch campaign" });
      }
      break;

    case 'PUT':
      try {
        const campaign = await storage.updateCampaign(id, req.body);
        if (!campaign) {
          return res.status(404).json({ message: "Campaign not found" });
        }
        res.status(200).json(campaign);
      } catch (error) {
        res.status(500).json({ message: "Failed to update campaign" });
      }
      break;

    case 'DELETE':
      try {
        const deleted = await storage.deleteCampaign(id);
        if (!deleted) {
          return res.status(404).json({ message: "Campaign not found" });
        }
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ message: "Failed to delete campaign" });
      }
      break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}