import axios from "axios";

const API_BASE_URL = "/api"; // Next.js API route

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

// ============================================================================
// SERVICE ENDED
// X-Phere Mining Pool has been discontinued. All backend calls are disabled.
// The new mining pool is available at https://xppool.io
// API functions below are kept as stubs so existing pages keep compiling,
// but they no longer reach any backend.
// ============================================================================

const SERVICE_ENDED_MESSAGE =
  "X-Phere Mining Pool service has ended. Please use https://xppool.io";

// Fetch miner statistics
export const getMinerStats = async (address: string) => {
  // Service ended: backend call disabled.
  // try {
  //   const response = await api.get(`/miners/${address}/stats`);
  //   return response.data;
  // } catch (error) {
  //   console.error("Failed to fetch miner statistics", error);
  //   throw error;
  // }
  throw new Error(SERVICE_ENDED_MESSAGE);
};

// Fetch pool statistics
export const getPoolStats = async (timerange: string) => {
  // Service ended: backend call disabled.
  // try {
  //   const response = await api.get("/pool/stats");
  //   return response.data;
  // } catch (error) {
  //   console.error("Failed to fetch pool statistics", error);
  //   throw error;
  // }
  throw new Error(SERVICE_ENDED_MESSAGE);
};

// Fetch worker statistics
export const getWorkerStats = async (address: string, workerName: string) => {
  // Service ended: backend call disabled.
  // try {
  //   const response = await api.get(
  //     `/miners/${address}/workers/${workerName}/stats`
  //   );
  //   return response.data;
  // } catch (error) {
  //   console.error("Failed to fetch worker statistics", error);
  //   throw error;
  // }
  throw new Error(SERVICE_ENDED_MESSAGE);
};

// Fetch recent rewards
export const getRecentRewards = async () => {
  // Service ended: backend call disabled.
  // try {
  //   const response = await api.get("/rewards/recent");
  //   return response.data;
  // } catch (error) {
  //   console.error("Failed to fetch recent rewards", error);
  //   throw error;
  // }
  throw new Error(SERVICE_ENDED_MESSAGE);
};

// Fetch rewards summary
export const getRewardsSummary = async () => {
  // Service ended: backend call disabled.
  // try {
  //   const response = await api.get("/rewards/summary");
  //   return response.data;
  // } catch (error) {
  //   console.error("Failed to fetch rewards summary", error);
  //   throw error;
  // }
  throw new Error(SERVICE_ENDED_MESSAGE);
};

// Search functionality (search by address or worker)
export const searchMiner = async (query: string) => {
  // Service ended: backend call disabled.
  // try {
  //   if (query.startsWith("0x") || query.length > 30) {
  //     return getMinerStats(query);
  //   } else {
  //     throw new Error("Searching by worker name is not supported yet");
  //   }
  // } catch (error) {
  //   console.error("An error occurred during the search", error);
  //   throw error;
  // }
  throw new Error(SERVICE_ENDED_MESSAGE);
};

export default api;
