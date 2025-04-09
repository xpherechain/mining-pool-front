import Layout from '../components/Layout';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const DownloadGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

const DownloadCard = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`;

const SoftwareName = styled.h3`
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const DownloadButton = styled.a`
  display: inline-block;
  background: #0070f3;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  text-align: center;
  
  &:hover {
    background: #0051a8;
  }
`;

const DownloadsPage = () => {
  const softwareList = [
    {
      name: 'NBMiner',
      description: 'NVIDIA/AMD GPU 채굴기로, ethash, etchash, octopus, kawpow 알고리즘을 지원합니다.',
      downloadUrl: 'https://github.com/NebuTech/NBMiner/releases',
      version: 'v42.2'
    },
    {
      name: 'T-Rex Miner',
      description: 'NVIDIA GPU 최적화 채굴기로, ethash, kawpow, autolykos2, firopow 알고리즘 지원.',
      downloadUrl: 'https://github.com/trexminer/T-Rex/releases',
      version: 'v0.26.8'
    },
    {
      name: 'GMiner',
      description: 'NVIDIA/AMD GPU 채굴기로 다양한 알고리즘을 지원합니다.',
      downloadUrl: 'https://github.com/develsoftware/GMinerRelease/releases',
      version: 'v3.42'
    },
    {
      name: 'XMRig',
      description: 'CPU 및 GPU를 위한 고성능 RandomX, KawPow, CryptoNight 채굴기.',
      downloadUrl: 'https://github.com/xmrig/xmrig/releases',
      version: 'v6.18.0'
    },
    {
      name: 'lolMiner',
      description: 'AMD/NVIDIA GPU 채굴기로 ethash, etchash, beam 등 다양한 알고리즘 지원.',
      downloadUrl: 'https://github.com/Lolliedieb/lolMiner-releases/releases',
      version: 'v1.54'
    },
    {
      name: 'BzMiner',
      description: '다중 알고리즘 채굴기로 Ethash, Zilliqa, Radiant, Kaspa 등을 지원합니다.',
      downloadUrl: 'https://github.com/bzminer/bzminer/releases',
      version: 'v11.1.0'
    }
  ];

  return (
    <Layout title="다운로드">
      <Container>
        <h1>Stratum 마이닝 소프트웨어 다운로드</h1>
        <p>pool.x-phere.com 풀에서 사용할 수 있는 다양한 채굴 소프트웨어를 다운로드하세요.</p>
        
        <DownloadGrid>
          {softwareList.map((software, index) => (
            <DownloadCard key={index}>
              <SoftwareName>{software.name} {software.version}</SoftwareName>
              <Description>{software.description}</Description>
              <DownloadButton href={software.downloadUrl} target="_blank" rel="noopener noreferrer">
                다운로드
              </DownloadButton>
            </DownloadCard>
          ))}
        </DownloadGrid>
        
        <h2>설정 방법</h2>
        <p>
          다운로드한 소프트웨어를 설치한 후, 다음과 같은 연결 정보를 사용하여 구성하세요:
        </p>
        <ul>
          <li><strong>풀 주소:</strong> pool.x-phere.com:3333</li>
          <li><strong>사용자 이름:</strong> 당신의_지갑_주소</li>
          <li><strong>워커 이름:</strong> 지갑_주소.워커명</li>
          <li><strong>비밀번호:</strong> x (또는 비워두기)</li>
        </ul>
        
        <p>
          자세한 설정 방법은 <a href="/getting-started">시작하기</a> 페이지를 참조하세요.
        </p>
      </Container>
    </Layout>
  );
};

export default DownloadsPage;
