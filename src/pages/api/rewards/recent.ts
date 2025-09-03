import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export const maxDuration = 60;

const getApiBaseUrl = (host: string | undefined) => {
  if (host === process.env.TESTNET_DOMAIN) {
    return process.env.TESTNET_POOL_API_BASE_URL;
  }
  return process.env.MAINNET_POOL_API_BASE_URL;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const API_BASE_URL = getApiBaseUrl(req.headers.host);
  try {
    const response = await axios.get(`${API_BASE_URL}/api/rewards/recent`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error occurred while calling recent rewards API:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch recent rewards data." });
  }
}
