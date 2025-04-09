import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import styled from 'styled-components';
import { searchMiner, getMinerStats, getWorkerStats } from '../services/api';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const SearchForm = styled.form`
  margin: 2rem 0;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-width: 200px;
`;

const SearchButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: #0051a8;
  }
`;

const ResultCard = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ResultTitle = styled.h2`
  margin-top: 0;
  color: #333;
  font-size: 1.2rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const StatItem = styled.div`
  margin: 0.5rem 0;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const StatValue = styled.div`
  font-weight: bold;
  margin-top: 0.25rem;
`;

const WorkersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
`;

const TableCell = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
`;

const NoResults = styled.div`
  padding: 1.5rem;
  background: #f5f5f5;
  border-radius: 8px;
  text-align: center;
  color: #666;
`;

const RecentSharesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const RecentSharesHeader = styled.th`
  text-align: left;
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
`;

const RecentSharesCell = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
  text-align: center;
`;

// 서버에서 초기 데이터 로드 (URL 쿼리 파라미터가 있는 경우)
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const searchQuery = query.address as string;
  
  if (searchQuery) {
    try {
      const minerData = await getMinerStats(searchQuery);
      return {
        props: {
          initialQuery: searchQuery,
          initialResults: minerData,
          initialError: null
        }
      };
    } catch (error) {
      return {
        props: {
          initialQuery: searchQuery,
          initialResults: null,
          initialError: 'Failed to fetch data.'
        }
      };
    }
  }
  
  return {
    props: {
      initialQuery: '',
      initialResults: null,
      initialError: null
    }
  };
};

interface SearchPageProps {
  initialQuery: string;
  initialResults: any;
  initialError: string | null;
}

const SearchPage = ({ initialQuery, initialResults, initialError }: SearchPageProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState(initialResults);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialError);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setError('Please enter a wallet address or worker name.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const [wallet, worker] = query.split('.');
      let data;
      if (worker) {
        data = await getWorkerStats(wallet, worker); // 워커 상태 가져오기
        data.type = 'worker';
      } else {
        data = await getMinerStats(wallet); // 마이너 상태 가져오기
        data.type = 'wallet';
      }
      setResults(data);
    } catch (err) {
      console.error('Error occurred during search', err);
      setError('An error occurred during the search.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Search">
      <Container>
        <h1>Search Miner & Worker</h1>
        <p>Search by wallet address or wallet.worker name to check mining status.</p>
        
        <SearchForm onSubmit={handleSearch}>
          <SearchInput 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter wallet address or wallet.worker name" 
          />
          <SearchButton type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </SearchButton>
        </SearchForm>
        
        {error && <NoResults>{error}</NoResults>}
        
        {results && results.type === 'wallet' && (
          <>
            <ResultCard>
              <ResultTitle>Wallet Information</ResultTitle>
              <p><strong>Address:</strong> {results.miner.address}</p>
              
              <StatsGrid>
                <StatItem>
                  <StatLabel>Confirmed Balance</StatLabel>
                  <StatValue>{results.balance.confirmed}</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>Pending Balance</StatLabel>
                  <StatValue>{results.balance.pending}</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>Current Hashrate</StatLabel>
                  <StatValue>{results.stats.hashrate}</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>Valid Shares</StatLabel>
                  <StatValue>{results.stats.validShares}</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>Invalid Shares</StatLabel>
                  <StatValue>{results.stats.invalidShares}</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>Blocks Found</StatLabel>
                  <StatValue>{results.stats.blocksFound}</StatValue>
                </StatItem>
              </StatsGrid>
            </ResultCard>
          </>
        )}
        
        {results && results.type === 'worker' && (
          <ResultCard>
            <ResultTitle>Worker Information</ResultTitle>
            <p><strong>Name:</strong> {results.worker.name}</p>
            <p><strong>Status:</strong> {results.worker.status}</p>
            
            <StatsGrid>
              <StatItem>
                <StatLabel>Current Hashrate</StatLabel>
                <StatValue>{results.worker.hashrate}</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Valid Shares</StatLabel>
                <StatValue>{results.worker.validShares}</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Invalid Shares</StatLabel>
                <StatValue>{results.worker.invalidShares}</StatValue>
              </StatItem>
            </StatsGrid>
          </ResultCard>
        )}
        
        {loading && <p>Loading...</p>}
      </Container>
    </Layout>
  );
};

export default SearchPage;
