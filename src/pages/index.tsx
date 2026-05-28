import styled from 'styled-components';
import Layout from '../components/Layout';

const NEW_POOL_URL = 'https://xppool.io';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 60vh;
  padding: 3rem 1rem;
`;

const Badge = styled.div`
  display: inline-block;
  background: #fff1f0;
  color: #cf1322;
  border: 1px solid #ffa39e;
  border-radius: 999px;
  padding: 0.4rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #222;
  margin: 0 0 1rem;
`;

const Description = styled.p`
  font-size: 1.05rem;
  color: #555;
  line-height: 1.7;
  max-width: 560px;
  margin: 0 0 2rem;
`;

const NewPoolCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  max-width: 480px;
  width: 100%;
`;

const NewPoolLabel = styled.div`
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 0.5rem;
`;

const NewPoolLink = styled.a`
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #0070f3;
  margin-bottom: 1.5rem;
  word-break: break-all;
`;

const CTAButton = styled.a`
  display: inline-block;
  background: #0070f3;
  color: #fff;
  padding: 0.85rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    background: #0051a8;
    text-decoration: none;
  }
`;

const HomePage = () => {
  return (
    <Layout title="Service Ended">
      <Wrapper>
        <Badge>Service Ended</Badge>
        <Title>X-Phere Mining Pool has been discontinued.</Title>
        <Description>
          Thank you for using pool.x-phere.com.
          This mining pool service is no longer in operation.
          Please use the new mining pool below to continue mining.
        </Description>

        <NewPoolCard>
          <NewPoolLabel>New Mining Pool</NewPoolLabel>
          <NewPoolLink href={NEW_POOL_URL} target="_blank" rel="noopener noreferrer">
            xppool.io
          </NewPoolLink>
          <div>
            <CTAButton href={NEW_POOL_URL} target="_blank" rel="noopener noreferrer">
              Go to xppool.io
            </CTAButton>
          </div>
        </NewPoolCard>
      </Wrapper>
    </Layout>
  );
};

export default HomePage;
