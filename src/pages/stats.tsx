import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getPoolStats, getRecentRewards } from '../services/api';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
  margin: 2rem 0;
`;

const TimeRangeSelector = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const TimeButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: ${props => props.active ? '#0070f3' : '#fff'};
  color: ${props => props.active ? '#fff' : '#333'};
  cursor: pointer;
  
  &:hover {
    border-color: #0070f3;
  }
`;

const StatsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 0.75rem;
  border-bottom: 2px solid #eee;
  background: #f9f9f9;
`;

const TableCell = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
`;

const StatsPage = () => {
  const [timeRange, setTimeRange] = useState('1h');
  const [poolStats, setPoolStats] = useState({
    hashrate: 0,
    workers: 0,
    blocksFound: 0,
    miners: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPoolStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPoolStats(timeRange);
        setPoolStats(data.stats);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPoolStats();
  }, [timeRange]);

  return (
    <Layout title="Statistics">
      <Container>
        <h1>Pool Statistics</h1>
        <p>Mining statistics for pool.x-phere.com.</p>
        
        <TimeRangeSelector>
          <TimeButton active={timeRange === '1h'} onClick={() => setTimeRange('1h')}>1 Hour</TimeButton>
          <TimeButton active={timeRange === '6h'} onClick={() => setTimeRange('6h')}>6 Hours</TimeButton>
          <TimeButton active={timeRange === '24h'} onClick={() => setTimeRange('24h')}>24 Hours</TimeButton>
          <TimeButton active={timeRange === '7d'} onClick={() => setTimeRange('7d')}>7 Days</TimeButton>
          <TimeButton active={timeRange === '30d'} onClick={() => setTimeRange('30d')}>30 Days</TimeButton>
        </TimeRangeSelector>
        
        <h2>Hashrate Changes</h2>
        { error ? (
          <p>{error.message}</p>
        ) : (
          <>
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={poolStats}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="hashrate" 
                    name="Hashrate (TH/s)" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="workers" 
                    name="Workers" 
                    stroke="#82ca9d" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            
            <h2>Statistics by Time</h2>
            <StatsTable>
              <thead>
                <tr>
                  <TableHeader>Time</TableHeader>
                  <TableHeader>Hashrate (TH/s)</TableHeader>
                  <TableHeader>Workers</TableHeader>
                </tr>
              </thead>
              <tbody>
                {poolStats?
                  <tr>
                    <TableCell>{poolStats.miners}</TableCell>
                    <TableCell>{poolStats.hashrate}</TableCell>
                    <TableCell>{poolStats.blocksFound}</TableCell>
                  </tr>
                : (
                  <tr>
                    <TableCell colSpan={3}>No data available.</TableCell>
                  </tr>
                )}
              </tbody>
            </StatsTable>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default StatsPage;
