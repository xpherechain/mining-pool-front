import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_BASE_URL = process.env.POOL_API_BASE_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/rewards/recent`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error occurred while calling recent rewards API:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch recent rewards data.' });
  }
}
