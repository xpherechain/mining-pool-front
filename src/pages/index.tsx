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

const FullWidthCard = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  grid-column: 1 / -1;
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
      
      <StatusGrid>
        <FullWidthCard>
          <CardTitle>Pool Information</CardTitle>
          <StatusItem>
            <Label>Testnet Stratum URL:</Label>
            <Value>testnet-stratum.x-phere.com:33333</Value>
          </StatusItem>
          <StatusItem>
            <Label>Mainnet Stratum URL:</Label>
            <Value>stratum-sgp.x-phere.com:33333</Value>
          </StatusItem>
        </FullWidthCard>

        <Card>
          <CardTitle>Pool Status</CardTitle>
          <StatusItem>
            <Label>Hashrate:</Label>
            <Value>{poolStats ? formatHashrate(poolStats.hashrate) : '0 H/s'}</Value>
          </StatusItem>
          <StatusItem>
            <Label>Hash Power Share:</Label>
            <Value>
              {poolStats 
                ? `${((poolStats.hashrate / poolStats.difficulty * 60) * 100).toFixed(2)}%` 
                : '0%'}
            </Value>
          </StatusItem>
          <StatusItem>
            <Label>Pool Fee:</Label>
            <Value>1%</Value>
          </StatusItem>
          <StatusItem>
            <Label>Number of Miners:</Label>
            <Value>{poolStats ? formatNumber(poolStats.miners) : '0'}</Value>
          </StatusItem>
          <StatusItem>
            <Label>Number of Workers:</Label>
            <Value>{poolStats ? formatNumber(poolStats.workers) : '0'}</Value>
          </StatusItem>
        </Card>
        
        <Card>
          <CardTitle>Network Information</CardTitle>
          <StatusItem>
            <Label>Block Height:</Label>
            <Value>{poolStats ? formatNumber(poolStats.lastBlockHeight) : '0'}</Value>
          </StatusItem>
          <StatusItem>
            <Label>Network Difficulty:</Label>
            <Value>{poolStats ? `${formatNumber(poolStats.difficulty)}` : '0'}</Value>
          </StatusItem>
        </Card>
        
        <Card>
          <CardTitle>Block Information</CardTitle>
          <StatusItem>
            <Label>Blocks Found:</Label>
            <Value>{poolStats ? formatNumber(poolStats.blocksFound) : '0'}</Value>
          </StatusItem>
          <StatusItem>
            <Label>Total Mined:</Label>
            <Value>{poolStats ? `${formatNumber(poolStats.totalReward)} XP` : '0 XP'}</Value>
          </StatusItem>
        </Card>

        <FullWidthCard>
          <CardTitle>Additional Information</CardTitle>
          <StatusItem>
            <Value>Calculated hash power share is an estimated value based on reverse calculation of shares. The actual value may differ.</Value>
          </StatusItem>
          <StatusItem>
            <Value>Miner and worker counts may include duplicates. The actual number of unique connections is higher.</Value>
          </StatusItem>
          <StatusItem>
            <Value>Not all found blocks result in rewards. Pending rewards are calculated every minute and distributed every 5 minutes if the pending amount exceeds 10 XP.</Value>
          </StatusItem>
        </FullWidthCard>
      </StatusGrid>
    </Layout>
  );
};

export default HomePage;
