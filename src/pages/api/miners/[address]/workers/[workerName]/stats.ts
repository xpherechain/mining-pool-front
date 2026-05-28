import { NextApiRequest, NextApiResponse } from "next";
// import axios from "axios";

export const maxDuration = 60;

// ============================================================================
// SERVICE ENDED
// X-Phere Mining Pool has been discontinued. Backend proxy disabled.
// New mining pool: https://xppool.io
// ============================================================================

// const getApiBaseUrl = (host: string | undefined) => {
//   if (host === process.env.TESTNET_DOMAIN) {
//     return process.env.TESTNET_POOL_API_BASE_URL;
//   }
//   return process.env.MAINNET_POOL_API_BASE_URL;
// };

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  // Service ended: backend call disabled.
  // const API_BASE_URL = getApiBaseUrl(req.headers.host);
  // const { address, workerName } = req.query;
  // try {
  //   const response = await axios.get(
  //     `${API_BASE_URL}/api/miners/${address}/workers/${workerName}/stats`
  //   );
  //   res.status(200).json(response.data);
  // } catch (error) {
  //   console.error("워커 통계 API 호출 중 오류:", error);
  //   res.status(500).json({
  //     success: false,
  //     error: "워커 통계 데이터를 가져오는데 실패했습니다.",
  //   });
  // }
  res.status(503).json({
    success: false,
    error: "Service ended. Please use https://xppool.io",
  });
}
