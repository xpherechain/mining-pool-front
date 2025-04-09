import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_BASE_URL = process.env.POOL_API_BASE_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.query;

  try {
    const response = await axios.get(`${API_BASE_URL}/api/miners/${address}/stats`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('채굴자 통계 API 호출 중 오류:', error);
    res.status(500).json({ success: false, error: '채굴자 통계 데이터를 가져오는데 실패했습니다.' });
  }
}
