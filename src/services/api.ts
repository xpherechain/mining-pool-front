import axios from 'axios';

const API_BASE_URL = '/api'; // Next.js API route

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Fetch miner statistics
export const getMinerStats = async (address: string) => {
  try {
    const response = await api.get(`/miners/${address}/stats`); // Calls `/pages/api/miners/[address]/stats`
    return response.data;
  } catch (error) {
    console.error('Failed to fetch miner statistics', error);
    throw error;
  }
};

// Fetch pool statistics
export const getPoolStats = async (timerange: string) => {
  try {
    const response = await api.get('/pool/stats'); // Calls `/pages/api/pool/stats`
    return response.data;
  } catch (error) {
    console.error('Failed to fetch pool statistics', error);
    throw error;
  }
};

// Fetch worker statistics
export const getWorkerStats = async (address: string, workerName: string) => {
  try {
    const response = await api.get(`/miners/${address}/workers/${workerName}/stats`); // Calls `/pages/api/miners/[minerAddress]/workers/[workerName]/stats`
    return response.data;
  } catch (error) {
    console.error('Failed to fetch worker statistics', error);
    throw error;
  }
};

// Fetch recent rewards
export const getRecentRewards = async () => {
  try {
    const response = await api.get('/rewards/recent'); // Calls `/pages/api/rewards/recent`
    return response.data;
  } catch (error) {
    console.error('Failed to fetch recent rewards', error);
    throw error;
  }
};

// Fetch rewards summary
export const getRewardsSummary = async () => {
  try {
    const response = await api.get('/rewards/summary'); // Calls `/pages/api/rewards/summary`
    return response.data;
  } catch (error) {
    console.error('Failed to fetch rewards summary', error);
    throw error;
  }
};

// Search functionality (search by address or worker)
export const searchMiner = async (query: string) => {
  try {
    // If the query is an address, fetch miner statistics
    if (query.startsWith('0x') || query.length > 30) {
      return getMinerStats(query);
    } else {
      // Searching by worker name must be handled by the backend
      // This can be implemented once the backend API is available
      throw new Error('Searching by worker name is not supported yet');
    }
  } catch (error) {
    console.error('An error occurred during the search', error);
    throw error;
  }
};

export default api;
