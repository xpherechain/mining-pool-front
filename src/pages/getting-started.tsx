import Layout from '../components/Layout';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Section = styled.section`
  margin: 2rem 0;
`;

const CodeBlock = styled.pre`
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 5px;
  overflow-x: auto;
`;

const GettingStartedPage = () => {
  return (
    <Layout title="Getting Started">
      <Container>
        <h1>Getting Started</h1>
        
        <Section>
          <h2>What is the Stratum Protocol?</h2>
          <p>
            Stratum is a network protocol for cryptocurrency mining that enables efficient communication between clients and servers.
            It is optimized for pool-based mining and standardizes the way miners receive and share work.
          </p>
        </Section>
        
        <Section>
          <h2>How to Mine Using the Stratum Architecture</h2>
          <p>Follow these steps to start mining with the Stratum protocol:</p>
          
          <h3>1. Install Mining Software</h3>
          <p>
            Download the mining software from the <a href="https://github.com/xpherechain/Xphere-miner">official repository</a>.
            The software supports Windows, macOS, and Linux, but the executable file may vary depending on the operating system.
          </p>
          
          <h3>2. Configure Mining Pool Connection</h3>
          <p>
            Use the following command to connect to the testnet mining pool:
          </p>
          <CodeBlock>
            miner -stratum stratum+tcp://0xEc9E0eE980dB4F123c2b7e81221c11062c7d91D8.worker1:password@testnet-stratum.x-phere.com:33333
          </CodeBlock>
          <p>
            Replace <code>0xEc9E0eE980dB4F123c2b7e81221c11062c7d91D8</code> with your wallet address, <code>worker1</code> with your worker name, and <code>password</code> with your desired password.
          </p>
          <p>
            While the command structure is similar across Windows, macOS, and Linux, ensure you use the correct executable file for your operating system.
          </p>
          
          <h3>3. Monitor Mining</h3>
          <p>
            Once mining starts, you can check your mining status, hashrate, and rewards by entering your wallet address on the <a href="/search">search page</a>.
          </p>
        </Section>
        
        <Section>
          <h2>PPLNS Reward System</h2>
          <p>
            The X-Phere pool distributes rewards using the PPLNS (Pay Per Last N Shares) system.
            This system provides more rewards to consistent miners and prevents pool hopping.
            When a block is found, the rewards are distributed proportionally to miners who submitted the last N shares.
          </p>
        </Section>
      </Container>
    </Layout>
  );
};

export default GettingStartedPage;
