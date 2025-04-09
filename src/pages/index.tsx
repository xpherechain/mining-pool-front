import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { getPoolStats } from '../services/api';

const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const CardTitle = styled.h2`
  margin-top: 0;
  color: #333;
  font-size: 1.2rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
`;

const StatusItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
`;

const Label = styled.span`
  color: #666;
`;

const Value = styled.span`
  font-weight: bold;
`;

const HomePage = () => {
  const [poolStats, setPoolStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatHashrate = (hashrate: number) => {
    const units = ['H/s', 'kH/s', 'MH/s', 'GH/s', 'TH/s', 'PH/s'];
    let unitIndex = 0;
    let value = hashrate;

    while (value >= 1000 && unitIndex < units.length - 1) {
      value /= 1000;
      unitIndex++;
    }

    return `${value.toFixed(2)} ${units[unitIndex]}`;
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('ko-KR').format(value);
  };

  useEffect(() => {
    const fetchPoolStats = async () => {
      try {
        // setLoading(true);
        const response = await getPoolStats(""); // Next.js API 라우트 호출
        setPoolStats(response.stats);
      } catch (err) {
        console.error('Failed to fetch pool stats', err);
        setError('Failed to fetch data.');
      } finally {
        // setLoading(false);
      }
    };

    fetchPoolStats();
  }, []);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Layout title="Home">
      <h1>X-Phere Mining Pool</h1>
      <p>Welcome to pool.x-phere.com</p>
      
      {poolStats && (
        <StatusGrid>
          <Card>
            <CardTitle>Pool Status</CardTitle>
            <StatusItem>
              <Label>Hashrate:</Label>
              <Value>{formatHashrate(poolStats.hashrate)}</Value>
            </StatusItem>
            <StatusItem>
              <Label>Number of Miners:</Label>
              <Value>{formatNumber(poolStats.miners)}</Value>
            </StatusItem>
            <StatusItem>
              <Label>Number of Workers:</Label>
              <Value>{formatNumber(poolStats.workers)}</Value>
            </StatusItem>
          </Card>
          
          <Card>
            <CardTitle>Network Information</CardTitle>
            <StatusItem>
              <Label>Block Height:</Label>
              <Value>{poolStats.blockHeight}</Value>
            </StatusItem>
            <StatusItem>
              <Label>Network Difficulty:</Label>
              <Value>{poolStats.networkDifficulty} T</Value>
            </StatusItem>
          </Card>
          
          <Card>
            <CardTitle>Block Information</CardTitle>
            <StatusItem>
              <Label>Last Block Found:</Label>
              <Value>{poolStats.lastBlockFound}</Value>
            </StatusItem>
          </Card>
        </StatusGrid>
      )}
    </Layout>
  );
};

export default HomePage;
