import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const getApiBaseUrl = (host: string | undefined) => {
  if (host === process.env.TESTNET_DOMAIN) {
    return process.env.TESTNET_POOL_API_BASE_URL;
  }
  return process.env.MAINNET_POOL_API_BASE_URL;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const API_BASE_URL = getApiBaseUrl(req.headers.host);
  const { address, workerName } = req.query;

  try {
    const response = await axios.get(`${API_BASE_URL}/api/miners/${address}/workers/${workerName}/stats`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('워커 통계 API 호출 중 오류:', error);
    res.status(500).json({ success: false, error: '워커 통계 데이터를 가져오는데 실패했습니다.' });
  }
}
