import styled from 'styled-components';

const ErrorContainer = styled.div`
  padding: 1rem;
  background-color: #fff0f0;
  border-left: 4px solid #ff3333;
  margin: 1rem 0;
  border-radius: 4px;
`;

const ErrorTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  color: #cc0000;
`;

const ErrorMessage = styled.p`
  margin: 0;
  color: #333;
`;

interface ErrorDisplayProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

const ErrorDisplay = ({ title = '오류가 발생했습니다', message, onRetry }: ErrorDisplayProps) => {
  return (
    <ErrorContainer>
      <ErrorTitle>{title}</ErrorTitle>
      <ErrorMessage>{message}</ErrorMessage>
      {onRetry && (
        <button onClick={onRetry} style={{ marginTop: '0.5rem' }}>
          Reload
        </button>
      )}
    </ErrorContainer>
  );
};

export default ErrorDisplay;
