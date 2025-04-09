import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_BASE_URL = 'http://159.138.247.137:3333';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/pool/stats`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error occurred while calling pool stats API:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch pool stats data.' });
  }
}
